import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { unlink } from 'fs/promises';
import path from 'path';
import { RowDataPacket } from 'mysql2';

// تعريف واجهة للمنتج
interface ProductRow extends RowDataPacket {
    id: number;
    image_url: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Aa112233',
        database: process.env.DB_NAME || 'alyoum_special'
    });

    try {
        // أولاً نجلب مسار الصورة
        const [rows] = await connection.execute<ProductRow[]>(
            'SELECT image_url FROM products WHERE id = ?',
            [params.id]
        );

        if (rows.length > 0 && rows[0].image_url) {
            // نحاول حذف الصورة
            try {
                const imageUrl = rows[0].image_url;
                const imagePath = path.join(process.cwd(), 'public', imageUrl);
                await unlink(imagePath);
                console.log('تم حذف الصورة:', imagePath);
            } catch (unlinkError) {
                console.error('خطأ في حذف الصورة:', unlinkError);
            }
        }

        // نحدث حالة المنتج في قاعدة البيانات
        await connection.execute(
            'UPDATE products SET is_active = 0 WHERE id = ?',
            [params.id]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Database Error' }, { status: 500 });
    } finally {
        await connection.end();
    }
}