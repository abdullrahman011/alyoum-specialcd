import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export const dynamic = 'force-dynamic';

export async function GET(
    _: NextRequest,
    context: { params: { category: string } }
) {
    const { category } = context.params;
    
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        const [rows] = await connection.execute(
            'SELECT * FROM products WHERE category = ? AND is_active = 1',
            [category]
        );
        return NextResponse.json(rows);
    } catch (err) {
        console.error('Database Error:', err);
        return NextResponse.json({ error: 'Database Error' }, { status: 500 });
    } finally {
        await connection.end();
    }
}