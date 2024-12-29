import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Aa112233',
        database: process.env.DB_NAME || 'alyoum_special'
    });

    try {
        const [rows] = await connection.execute(
            'SELECT * FROM products WHERE is_best = 1 AND is_active = 1'
        );
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Database Error' }, { status: 500 });
    } finally {
        await connection.end();
    }
}