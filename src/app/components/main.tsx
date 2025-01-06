'use client';
import Image from 'next/image'

export function Main(){
    return(
        <div className='mt-[1%]'>

       
        <div className= " border-t-4  border-red-400 p-[2.5%]  justify-between  grid-cols-3 grid gap-4"> 
        <div  onClick={()=>location.href='/webShopping'} className="border-2 border-slate-400 rounded-lg justify-items-center cursor-pointer hover:scale-105 duration-300" > {/* المتاجر الالكترونية*/}
           <Image  src="/webShopping.png" alt="webstore" width={60} height={60} />
       
       <p className='text-center' >المواقع الالكترونية</p>
        </div>
        <div  onClick={()=>location.href='/supermarket'} className="border-2 border-slate-400  rounded-lg justify-items-center cursor-pointer hover:scale-105 duration-300 "> {/* المتاجر الالكترونية*/}
           <Image src="/supermarket.png" alt="webstore" width={60} height={60} />
       
       <p className='text-center' >سوبر ماركت</p>
        </div>
        <div  onClick={()=>location.href='/delivery'} className="border-2 border-slate-400 rounded-lg justify-items-center cursor-pointer hover:scale-105 duration-300"> {/* المتاجر الالكترونية*/}
           <Image src="/delivery.png" alt="webstore" width={60} height={60} />
       
       <p className='text-center' >تطبيقات التوصيل</p>
        </div>

        <div  onClick={()=>location.href='/banks'} className="border-2 border-slate-400 rounded-lg justify-items-center cursor-pointer hover:scale-105 duration-300"> {/* المتاجر الالكترونية*/}
           <Image  className='mt-[2%]' src="/Cards.png" alt="webstore" width={60} height={60} />
       
       <p className='text-center  mt-[2%]' >البنوك</p>
        </div>
        <div  onClick={()=>location.href='/foods'} className="border-2 border-slate-400 rounded-lg justify-items-center cursor-pointer hover:scale-105 duration-300"> {/* المتاجر الالكترونية*/}
           <Image className='mt-[4%]' src="/foods.png" alt="webstore" width={60} height={60} />
       
       <p className='text-center mt-[7%]' >مطاعم و مقاهي</p>
        </div>
        <div  onClick={()=>location.href='/deals'} className="border-2 border-slate-400 rounded-lg justify-items-center  cursor-pointer hover:scale-105 duration-300"> {/* المتاجر الالكترونية*/}
           <Image  src="/Other.png" alt="webstore" width={60} height={60} />
       
       <p className='text-center' >عروض اخرى</p>
        </div>
      </div>
    

      </div>
    )

}