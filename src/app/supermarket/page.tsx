'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiInformationFill } from "react-icons/ri";

interface Product {
    id?: number;
    name: string;
    image_url: string;
    description: string;
    price_before: number;
    price_after: number;
    purchase_link: string;
    category: string;
}

export default function Supermarket() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                // تأكد من استخدام نفس القيمة المخزنة في قاعدة البيانات
                const response = await fetch('/api/products/category/supermarket');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched products:', data); // للتأكد من البيانات
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchProducts();
    }, []);

    return (
        <main>
            <div className="flex justify-center">
                <Image
                    className="cursor-pointer"
                    onClick={() => location.href = "/"}
                    src="/special day.png"
                    alt="special day"
                    width={200}
                    height={200}
                />
            </div>

            <div className="flex justify-end items-center mb-8">
                <div className="flex items-center gap-2 mr-2">
                    <RiInformationFill className="text-2xl text-blue-500" />
                    <p className="font-bold text-5xl">عروض اليوم للمتاجر الإلكترونية</p>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8">جاري التحميل...</div>
            ) : products.length === 0 ? (
                <div className="text-center py-8">لا توجد عروض متاحة حالياً</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {products.map(product => (
                        <div key={product.id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48">
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover rounded"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <del className="text-red-500">{product.price_before} SAR</del>
                                    <span className="font-bold text-green-600">{product.price_after} SAR</span>
                                </div>
                                <a
                                    href={product.purchase_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                                >
                                    تسوق الآن
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}