import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const createSequelize = () => new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        dialect: 'mysql',
        dialectModule: mysql2,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        dialectOptions: {
            connectTimeout: 60000
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        retry: {
            max: MAX_RETRIES
        }
    }
);

const sequelize = createSequelize();

const connectWithRetry = async (retries = MAX_RETRIES): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('تم الاتصال بقاعدة البيانات بنجاح.');
    } catch (error) {
        if (retries > 0) {
            console.error(`محاولة إعادة الاتصال... المحاولات المتبقية: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return connectWithRetry(retries - 1);
        }
        console.error('فشل الاتصال بقاعدة البيانات:', error);
        throw error;
    }
};

connectWithRetry();

export default sequelize;