import { NextResponse } from "next/server";
import { createConnection } from "mysql2/promise";

export async function GET(req: Request) {
    const category = req.url.split('/').pop();
    
    const conn = await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        const [rows] = await conn.execute(
            'SELECT * FROM products WHERE category = ?',
            [category]
        );
        return NextResponse.json(rows);
    } finally {
        await conn.end();
    }
}