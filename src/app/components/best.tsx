'use client';
import { useState, useEffect } from 'react';
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

   const fetchBestProducts = async () => {
       try {
           const response = await fetch('/api/products/best', {
               cache: 'no-store',
               next: { revalidate: 0 }
           });
           if (response.ok) {
               const data = await response.json();
               setBestProducts(data);
           }
       } catch (error) {
           console.error('Error fetching best products:', error);
       }
   };

   useEffect(() => {
       fetchBestProducts();
       // تحديث كل 5 ثواني
       const interval = setInterval(fetchBestProducts, 5000);
       return () => clearInterval(interval);
   }, []);

   if (bestProducts.length === 0) {
       return null;
   }

   return (
       <div className="relative w-full">
           <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory">
               {bestProducts.map(product => (
                   <div 
                       key={`${product.id}-${Date.now()}`} 
                       className="flex-none w-80 mx-2 snap-center border rounded-lg shadow-md overflow-hidden"
                   >
                       <div className="relative h-48">
                           {product.image_url ? (
                               <Image
                                   src={product.image_url}
                                   alt={product.name}
                                   fill
                                   className="object-cover"
                                   priority
                               />
                           ) : (
                               <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                   <span className="text-gray-500">لا توجد صورة</span>
                               </div>
                           )}
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