'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'

interface Product {
    id: number;
    name: string;
    image_url: string;
    description: string;
    price_before: number;
    price_after: number;
    purchase_link: string;
}

export function Offerweb() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error(`خطأ في الطلب: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('خطأ في جلب البيانات:', error);
                setError('فشل في جلب المنتجات');
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (isLoading) return <div>جاري التحميل...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className='my-[1%] border-t-4 border-red-300'>
            <ul className='mt-[2%] grid grid-cols-1 md:grid-cols-2 gap-4'>
                {products.map((product) => (
                    <li 
                        key={product.id} 
                        className='border-2 border-slate-400 p-4 rounded cursor-pointer hover:scale-105 duration-300'
                    >
                        <h2 className="font-bold text-xl mb-2">{product.name}</h2>
                        <div className="relative w-full h-[200px] mb-2">
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <div className="flex justify-between items-center mb-2">
                            <del className="text-red-500">{product.price_before} SAR</del>
                            <span className="text-green-500 font-bold">{product.price_after} SAR</span>
                        </div>
                        <a
                            href={product.purchase_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                        >
                            شراء الآن
                        </a>
                    </li>
                ))}
            </ul>
            {products.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                    لا توجد منتجات متاحة حالياً
                </div>
            )}
        </div>
    );
}