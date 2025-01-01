'use client';
import React from 'react';
import Image from "next/image";
import { Main } from "./components/main";
import { Best } from "./components/best";
import { CountdownTimer } from "./components/CountdownTimer";


export default function Home() {
  return (
    <main>
      <div className="flex justify-center">
        <Image src="/special day.png" alt="special day" width={200} height={200} />
      </div>
      <CountdownTimer />
      
      <div className="text-[#333333] text-right mt-[4vh] px-[1vh] bolid">
        <h1 className="md:text-6xl mb-[2%] text-2xl">عروض اليوم</h1>
        <Main />
        <h1 className="text-4xl text-center mb-[2%]">افضل عروض اليوم</h1>
        <Best />
        <hr className='mt-8 border-black border'/>
        
      </div>
    </main>
  );
}