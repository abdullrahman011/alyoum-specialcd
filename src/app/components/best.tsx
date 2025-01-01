'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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

export function Best() {
    const [bestProducts, setBestProducts] = useState<Product[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBestProducts = async () => {
            try {
                const response = await fetch('/api/products/best');
                if (response.ok) {
                    const data = await response.json();
                    setBestProducts(data);
                }
            } catch (error) {
                console.error('Error fetching best products:', error);
            }
        };

        fetchBestProducts();
    }, []);

    if (bestProducts.length === 0) {
        return null;
    }

    return (
        <div className="relative">
            <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
            >
                {bestProducts.map(product => (
                    <div 
                        key={product.id} 
                        className="flex-none w-[300px] border rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="relative h-48">
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover"
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
        </div>
    );
}