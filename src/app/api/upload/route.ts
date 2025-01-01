import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// تأكد من تحميل متغيرات البيئة
console.log('Cloudinary Config:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: '***' // لا تطبع السر
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
    try {
        console.log('Starting file upload process...');
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            console.log('No file provided');
            return NextResponse.json({ error: "لم يتم رفع أي ملف" }, { status: 400 });
        }

        console.log('File info:', {
            name: file.name,
            type: file.type,
            size: file.size
        });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64File = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${base64File}`;

        console.log('Attempting to upload to Cloudinary...');
        try {
            const uploadResponse = await cloudinary.uploader.upload(dataURI, {
                folder: 'alyoum-special',
                resource_type: 'auto'
            });

            console.log('Upload successful:', uploadResponse.secure_url);
            return NextResponse.json({
                filePath: uploadResponse.secure_url,
                success: true
            });
        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return NextResponse.json(
                { error: "فشل في رفع الملف إلى Cloudinary" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('General upload error:', error);
        return NextResponse.json(
            {
                error: "فشل في معالجة الملف",
                details: error instanceof Error ? error.message : 'خطأ غير معروف'
            },
            { status: 500 }
        );
    }
}