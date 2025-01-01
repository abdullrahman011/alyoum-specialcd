import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
    try {
        const { id } = await request.json();

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false // تغيير هذه القيمة لحل مشكلة SSL
            }
        });

        try {
            await connection.execute(
                'DELETE FROM products WHERE id = ?',
                [id]
            );

            return NextResponse.json({
                success: true,
                message: 'تم حذف المنتج بنجاح'
            });

        } finally {
            await connection.end();
        }
    } catch (error) {
        console.error('خطأ في حذف المنتج:', error);
        return NextResponse.json(
            { 
                error: "فشل في حذف المنتج", 
                details: error instanceof Error ? error.message : 'خطأ غير معروف'
            },
            { status: 500 }
        );
    }
}