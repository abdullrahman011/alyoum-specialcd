'use client';
import Script from 'next/script';

export default function GoogleTags() {
    return (
        <>
            {/* Google Analytics */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=G-V29BMZFJPC`}
                strategy="lazyOnload"
            />
            <Script id="google-analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-V29BMZFJPC');
                `}
            </Script>

            {/* Google AdSense - تم تبسيط الكود */}
            <Script
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6285603860927889"
                async
                crossOrigin="anonymous"
            />
        </>
    );
}