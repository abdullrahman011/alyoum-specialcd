// src/app/api/products/category/[category]/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

interface RouteContext {
    params: Record<string, string>;
}

export async function GET(
    request: Request,
    context: RouteContext
) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Aa112233',
        database: process.env.DB_NAME || 'alyoum_special'
    });

    try {
        console.log('Received category param:', context.params.category);
        
        const [allProducts] = await connection.execute(
            'SELECT * FROM products WHERE is_active = 1'
        );
        console.log('All active products:', allProducts);

        const [rows] = await connection.execute(
            'SELECT * FROM products WHERE category = ? AND is_active = 1',
            [context.params.category]
        );
       
        console.log('Filtered products:', rows);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { error: 'Database Error', details: error },
            { status: 500 }
        );
    } finally {
        await connection.end();
    }
}