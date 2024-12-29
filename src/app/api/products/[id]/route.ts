
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
   request: Request,
   { params }: { params: { id: string } }
) {
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

       return NextResponse.json({ success: true });
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