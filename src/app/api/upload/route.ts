import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
   try {
       const data = await request.formData();
       const file: File | null = data.get('file') as unknown as File;

       if (!file) {
           return NextResponse.json({ error: "لم يتم رفع أي ملف" }, { status: 400 });
       }

       const bytes = await file.arrayBuffer();
       const buffer = Buffer.from(bytes);

       // تحويل Buffer إلى Base64
       const base64File = buffer.toString('base64');
       const dataURI = `data:${file.type};base64,${base64File}`;

       try {
           const uploadResponse = await cloudinary.uploader.upload(dataURI, {
               folder: 'alyoum-special',
               resource_type: 'auto'
           });

           return NextResponse.json({
               filePath: uploadResponse.secure_url,
               success: true
           });
       } catch (uploadError) {
           console.error('خطأ في رفع الملف إلى Cloudinary:', uploadError);
           return NextResponse.json(
               { error: "فشل في رفع الملف إلى Cloudinary" },
               { status: 500 }
           );
       }
   } catch (error) {
       console.error('خطأ في عملية الرفع:', error);
       return NextResponse.json(
           {
               error: "فشل في معالجة الملف",
               details: error instanceof Error ? error.message : 'خطأ غير معروف'
           },
           { status: 500 }
       );
   }
}