import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
   const connection = await mysql.createConnection({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       ssl: { rejectUnauthorized: false }
   });

   try {
       const [rows] = await connection.execute('SELECT * FROM products');
       return NextResponse.json(rows);
   } catch (error) {
       console.error('Database Error:', error);
       return NextResponse.json({ error: 'Database Error' }, { status: 500 });
   } finally {
       await connection.end();
   }
}

export async function POST(request: Request) {
   const data = await request.json();
   const connection = await mysql.createConnection({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       ssl: { rejectUnauthorized: false }
   });

   try {
       const [result] = await connection.execute(
           'INSERT INTO products (name, image_url, description, price_before, price_after, purchase_link, is_active, offer_date, category, is_best) VALUES (?, ?, ?, ?, ?, ?, 1, NOW(), ?, ?)',
           [data.name, data.image_url, data.description, data.price_before, data.price_after, data.purchase_link, data.category, data.is_best]
       );
       return NextResponse.json(result);
   } catch (error) {
       console.error('Database Error:', error);
       return NextResponse.json({ error: 'Database Error' }, { status: 500 });
   } finally {
       await connection.end();
   }
}