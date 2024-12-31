import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
   const uri = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?ssl=true`;
   
   const connection = await mysql.createConnection(uri);

   try {
       const [rows] = await connection.execute('SELECT * FROM products');
       return NextResponse.json(rows);
   } catch (error) {
       console.error('Database Error:', error);
       return NextResponse.json({ error: 'Database Error', details: error }, { status: 500 });
   } finally {
       await connection.end();
   }
}

export async function POST(request: Request) {
   const uri = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?ssl=true`;
   
   const data = await request.json();
   const connection = await mysql.createConnection(uri);

   try {
       const [result] = await connection.execute(
           'INSERT INTO products (name, image_url, description, price_before, price_after, purchase_link, is_active, offer_date, category, is_best) VALUES (?, ?, ?, ?, ?, ?, 1, NOW(), ?, ?)',
           [data.name, data.image_url, data.description, data.price_before, data.price_after, data.purchase_link, data.category, data.is_best]
       );
       return NextResponse.json(result);
   } catch (error) {
       console.error('Database Error:', error);
       return NextResponse.json({ error: 'Database Error', details: error }, { status: 500 });
   } finally {
       await connection.end();
   }
}