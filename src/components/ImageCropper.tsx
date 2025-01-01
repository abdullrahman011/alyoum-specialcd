'use client';
import { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from 'next/image';

interface ImageCropperProps {
    file: File;
    onCropComplete: (croppedFile: File) => void;
    onCancel: () => void;
}

export function ImageCropper({ file, onCropComplete, onCancel }: ImageCropperProps) {
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0
    });
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setImageRef(e.currentTarget);
    };

    const getCroppedImg = async () => {
        if (!imageRef) return;

        const canvas = document.createElement('canvas');
        const scaleX = imageRef.naturalWidth / imageRef.width;
        const scaleY = imageRef.naturalHeight / imageRef.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        ctx.drawImage(
            imageRef,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise<File>((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) return;
                const croppedFile = new File([blob], file.name, {
                    type: file.type,
                    lastModified: Date.now(),
                });
                resolve(croppedFile);
            }, file.type);
        });
    };

    const handleCropComplete = async () => {
        const croppedFile = await getCroppedImg();
        if (croppedFile) {
            onCropComplete(croppedFile);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-4 max-w-2xl w-full">
                <h3 className="text-lg font-bold mb-4 text-right">تحرير الصورة</h3>
                <div className="mb-4">
                    {file && (
                        <ReactCrop
                            crop={crop}
                            onChange={c => setCrop(c)}
                            aspect={4/3}
                        >
                            <Image
                                src={URL.createObjectURL(file)}
                                onLoad={onImageLoad}
                                alt="صورة للتحرير"
                            />
                        </ReactCrop>
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleCropComplete}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        تأكيد
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    );
}