'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Product {
    id?: number;
    name: string;
    image_url: string;
    description: string;
    price_before: number;
    price_after: number;
    purchase_link: string;
    category: string;
    is_best: boolean;
}

const categories = [
    { value: 'delivery', label: 'تطبيقات التوصيل' },
    { value: 'supermarket', label: 'سوبر ماركت' },
    { value: 'webShopping', label: 'المواقع الالكترونية' },
    { value: 'deals', label: 'عروض اخرى' },
    { value: 'foods', label: 'مطاعم و مقاهي' },
    { value: 'banks', label: 'البنوك' }
];

export default function Dashboard() {
    const { status } = useSession();
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<Product>({
        name: '',
        image_url: '',
        description: '',
        price_before: 0,
        price_after: 0,
        purchase_link: '',
        category: '',
        is_best: false
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            return data.filePath;
        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (file) {
                const imagePath = await handleImageUpload(file);
                if (imagePath) {
                    formData.image_url = imagePath;
                }
            }

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('تم إضافة المنتج بنجاح');
                fetchProducts();
                setFile(null);
                setFormData({
                    name: '',
                    image_url: '',
                    description: '',
                    price_before: 0,
                    price_after: 0,
                    purchase_link: '',
                    category: '',
                    is_best: false
                });
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('حدث خطأ في إضافة المنتج');
        }
    };
    const handleDelete = async (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            try {
                const response = await fetch('/api/delete-product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id })
                });

                if (response.ok) {
                    setProducts(products.filter(p => p.id !== id));
                    alert('تم حذف المنتج بنجاح');
                } else {
                    throw new Error('فشل في حذف المنتج');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('حدث خطأ في حذف المنتج');
            }
        }
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        return null;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="block mb-1">اسم المنتج</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">القسم</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">اختر القسم</option>
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">صورة المنتج</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full p-2 border rounded"
                        accept="image/*"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">الوصف</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">السعر قبل</label>
                        <input
                            type="number"
                            value={formData.price_before}
                            onChange={(e) => setFormData({ ...formData, price_before: parseFloat(e.target.value) })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">السعر بعد</label>
                        <input
                            type="number"
                            value={formData.price_after}
                            onChange={(e) => setFormData({ ...formData, price_after: parseFloat(e.target.value) })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1">رابط الشراء</label>
                    <input
                        type="url"
                        value={formData.purchase_link}
                        onChange={(e) => setFormData({ ...formData, purchase_link: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        id="is_best"
                        checked={formData.is_best}
                        onChange={(e) => setFormData({ ...formData, is_best: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="is_best" className="text-sm font-medium text-gray-700">
                        أفضل عروض اليوم
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                    إضافة المنتج
                </button>
            </form>

            <div onClick={() => { router.push('/') }} className="cursor-pointer border-4 text-center mb-8">
                <p>الرئيسية</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border rounded p-4 shadow-md">
                        <div className="relative h-48 mb-2">
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                priority
                                className="object-cover rounded"
                            />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-sm text-gray-500 mb-2">
                            {categories.find(c => c.value === product.category)?.label}
                        </p>
                        <div className="flex justify-between items-center mb-2">
                            <del className="text-red-500">{product.price_before} SAR</del>
                            <span className="font-bold text-green-600">{product.price_after} SAR</span>
                        </div>
                        <button
                            onClick={() => handleDelete(product.id!)}
                            className="w-full mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                        >
                            حذف
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}