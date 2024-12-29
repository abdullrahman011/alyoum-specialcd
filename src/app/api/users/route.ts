import { NextResponse } from 'next/server';
import User from '@/lib/models/user';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // تشفير كلمة المرور
    const hashedPassword = await User.hashPassword(body.password);
    
    // إنشاء المستخدم
    const user = await User.create({
      username: body.username,
      password: hashedPassword,
      email: body.email,
      role: body.role || 'editor'
    });

    // استخراج البيانات الآمنة مباشرة
    const userJson = user.toJSON();
    delete userJson.password;
    
    return NextResponse.json(userJson, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'فشل في إنشاء المستخدم' },
      { status: 500 }
    );
  }
}