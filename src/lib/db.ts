import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        dialect: 'mysql',
        dialectModule: mysql2,
        logging: console.log,
        dialectOptions: {
            connectTimeout: 60000
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// اختبار الاتصال بشكل صريح
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('تم الاتصال بقاعدة البيانات بنجاح.');
    } catch (error) {
        console.error('فشل الاتصال بقاعدة البيانات:', error);
    }
};

testConnection();

export default sequelize;