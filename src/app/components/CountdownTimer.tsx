'use client';
import { useState, useEffect } from 'react';

export function CountdownTimer() {
   const [timeLeft, setTimeLeft] = useState('');
   const [showTooltip, setShowTooltip] = useState(false);

   useEffect(() => {
       const calculateTimeLeft = () => {
           const now = new Date();
           const target = new Date(now);
           target.setHours(17, 0, 0, 0);

           const tomorrow = new Date(now);
           tomorrow.setDate(tomorrow.getDate() + 1);
           tomorrow.setHours(17, 0, 0, 0);

           const finalTarget = now > target ? tomorrow : target;
           const diff = finalTarget.getTime() - now.getTime();
           
           const hours = Math.floor(diff / (1000 * 60 * 60));
           const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
           const seconds = Math.floor((diff % (1000 * 60)) / 1000);

           return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
       };

       const timer = setInterval(() => {
           setTimeLeft(calculateTimeLeft());
       }, 1000);

       return () => clearInterval(timer);
   }, []);

   return (
       <div className="text-center my-4 relative">
           <div 
               className="text-3xl font-bold  text-red-400 py-3 px-6 rounded-lg inline-block cursor-pointer  transition-colors"
               onMouseEnter={() => setShowTooltip(true)}
               onMouseLeave={() => setShowTooltip(false)}
               onClick={() => setShowTooltip(!showTooltip)}
           >
               {timeLeft}
           </div>
           {showTooltip && (
               <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                   يتم تحديث العروض يومياً
               </div>
           )}
       </div>
   );
}