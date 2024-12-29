import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
    try {
        // طباعة بداية عملية الرفع
        console.log('بدء عملية رفع الملف');

        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            console.log('لم يتم العثور على ملف');
            return NextResponse.json({ error: "لم يتم رفع أي ملف" }, { status: 400 });
        }

        // طباعة معلومات الملف
        console.log('معلومات الملف:', {
            name: file.name,
            size: file.size,
            type: file.type
        });

        const uploadDir = path.join(process.cwd(), 'public', 'images');
        console.log('مسار المجلد:', uploadDir);
        
        if (!existsSync(uploadDir)) {
            console.log('إنشاء المجلد:', uploadDir);
            await mkdir(uploadDir, { recursive: true });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // إنشاء اسم الملف وطباعته
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(uploadDir, fileName);
        console.log('مسار حفظ الملف:', filePath);

        // محاولة حفظ الملف
        try {
            await writeFile(filePath, buffer);
            console.log('تم حفظ الملف بنجاح');
        } catch (writeError) {
            console.error('خطأ في حفظ الملف:', writeError);
            throw writeError;
        }

        const imageUrl = `/images/${fileName}`;
        console.log('رابط الصورة:', imageUrl);

        return NextResponse.json({
            filePath: imageUrl,
            success: true
        });

    } catch (error) {
        console.error('خطأ في عملية الرفع:', error);
        return NextResponse.json(
            { 
                error: "فشل في رفع الملف", 
                details: error instanceof Error ? error.message : 'خطأ غير معروف'
            },
            { status: 500 }
        );
    }
}