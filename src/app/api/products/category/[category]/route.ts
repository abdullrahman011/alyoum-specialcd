import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(
    request: Request,
    { params }: { params: { category: string } }
) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Aa112233',
        database: process.env.DB_NAME || 'alyoum_special'
    });

    try {
        // طباعة القيمة المستلمة
        console.log('Received category param:', params.category);

        // استعلام للتحقق من جميع المنتجات أولاً
        const [allProducts] = await connection.execute(
            'SELECT * FROM products WHERE is_active = 1'
        );
        console.log('All active products:', allProducts);

        // الاستعلام الأساسي
        const [rows] = await connection.execute(
            'SELECT * FROM products WHERE category = ? AND is_active = 1',
            [params.category]
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