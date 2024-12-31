import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
   const connection = await mysql.createConnection({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       ssl: {
           rejectUnauthorized: false
       }
   });

   try {
       console.log('Attempting database query...');
       const [rows] = await connection.execute('SELECT * FROM products');
       console.log('Query result:', rows);
       return NextResponse.json(rows);
   } catch (error) {
       console.error('Database Error:', error);
       return NextResponse.json({ error: 'Database Error', details: error }, { status: 500 });
   } finally {
       await connection.end();
   }
}