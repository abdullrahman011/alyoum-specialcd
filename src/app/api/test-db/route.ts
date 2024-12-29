import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT || '3306')
        });

        const [rows] = await connection.execute('SELECT * FROM users');
        await connection.end();

        return NextResponse.json({ success: true, data: rows });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}