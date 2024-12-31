import { type NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

type Params = {
 params: {
   category: string;
 };
};

export async function GET(req: NextRequest, { params }: Params) {
   const connection = await mysql.createConnection({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME
   });

   try {
       const category = params.category;
       const [rows] = await connection.execute(
           'SELECT * FROM products WHERE category = ? AND is_active = 1',
           [category]
       );
       return new NextResponse(JSON.stringify(rows), {
           status: 200,
           headers: { 'Content-Type': 'application/json' }
       });
   } catch (err) {
       console.error('Error:', err);
       return new NextResponse(JSON.stringify({ error: 'Database Error' }), {
           status: 500,
           headers: { 'Content-Type': 'application/json' }
       });
   } finally {
       await connection.end();
   }
}