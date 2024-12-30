// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { unlink } from 'fs/promises';
import path from 'path';
import { RowDataPacket } from 'mysql2';

interface ProductRow extends RowDataPacket {
   id: number;
   image_url: string;
}

export async function DELETE(
   req: Request,
   context: { params: Record<string, string> }
) {
   try {
       const connection = await mysql.createConnection({
           host: process.env.DB_HOST,
           user: process.env.DB_USER,
           password: process.env.DB_PASSWORD,
           database: process.env.DB_NAME,
           port: Number(process.env.DB_PORT)
       });

       try {
           const [rows] = await connection.execute<ProductRow[]>(
               'SELECT image_url FROM products WHERE id = ?',
               [context.params.id]
           );

           if (rows[0]?.image_url) {
               try {
                   const imagePath = path.join(process.cwd(), 'public', rows[0].image_url);
                   await unlink(imagePath);
                   console.log('تم حذف الصورة:', imagePath);
               } catch (unlinkError) {
                   console.error('خطأ في حذف الصورة:', unlinkError);
               }
           }

           await connection.execute(
               'UPDATE products SET is_active = 0 WHERE id = ?',
               [context.params.id]
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