import { NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
//import { cookies } from 'next/headers';

const SECRET = 'M53T6LSNGBRE6OCGJFCFKU3YOA4ESMKAM5OXU5TSPFDTYZLCEYSA';

export async function POST(req: Request) {
    try {
        const { code } = await req.json();
        console.log('Received code:', code);

        const verified = speakeasy.totp.verify({
            secret: SECRET,
            encoding: 'base32',
            token: code,
            window: 2
        });

        console.log('Verification result:', verified);

        if (verified) {
            // إنشاء الاستجابة
            const response = NextResponse.json({ success: true });
            
            // إضافة cookie للجلسة
            response.cookies.set('auth-session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            return response;
        } 
        
        return NextResponse.json(
            { message: 'Invalid code' }, 
            { status: 401 }
        );
        
    } catch (serverError) {
        console.error('Server error:', serverError);
        return NextResponse.json(
            { message: 'Server error' }, 
            { status: 500 }
        );
    }
}