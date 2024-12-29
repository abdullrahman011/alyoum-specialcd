import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '3306')
    };

    // طباعة إعدادات الاتصال (بدون كلمة المرور)
    console.log('Connection config:', {
        ...config,
        password: '[HIDDEN]'
    });

    try {
        const connection = await mysql.createConnection(config);
        
        // اختبار بسيط
        const [result] = await connection.execute('SELECT 1 + 1 AS result');
        await connection.end();

        return NextResponse.json({ 
            success: true, 
            message: 'تم الاتصال بنجاح',
            result,
            config: {
                host: config.host,
                user: config.user,
                database: config.database,
                port: config.port
            }
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error',
            config: {
                host: config.host,
                user: config.user,
                database: config.database,
                port: config.port
            }
        }, { status: 500 });
    }
}