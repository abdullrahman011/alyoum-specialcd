// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { unlink } from 'fs/promises';
import path from 'path';
import { RowDataPacket } from 'mysql2';

interface ProductRow extends RowDataPacket {
   id: number;
   image_url: string;
}

export async function DELETE(
   req: NextRequest,
   { params }: { params: { id: string } }
) {
   const connection = await mysql.createConnection({
       host: process.env.DB_HOST || 'localhost',
       user: process.env.DB_USER || 'root',
       password: process.env.DB_PASSWORD || 'Aa112233',
       database: process.env.DB_NAME || 'alyoum_special',
       port: Number(process.env.DB_PORT) || 3306
   });

   try {
       const [rows] = await connection.execute<ProductRow[]>(
           'SELECT image_url FROM products WHERE id = ?',
           [params.id]
       );

       if (!rows.length) {
           return NextResponse.json(
               { error: 'Product not found' },
               { status: 404 }
           );
       }

       if (rows[0].image_url) {
           try {
               const imagePath = path.join(process.cwd(), 'public', rows[0].image_url);
               await unlink(imagePath);
           } catch (unlinkError) {
               console.error('Error deleting image:', unlinkError);
           }
       }

       await connection.execute(
           'UPDATE products SET is_active = 0 WHERE id = ?',
           [params.id]
       );

       return NextResponse.json({ 
           success: true,
           message: 'Product deleted successfully'
       });

   } catch (error) {
       console.error('Database Error:', error);
       return NextResponse.json(
           { error: 'Internal Server Error' },
           { status: 500 }
       );
   } finally {
       await connection.end();
   }
}