'use client';
import Script from 'next/script';

export default function GoogleTags() {
    return (
        <>
            {/* Google Analytics */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=G-V29BMZFJPC`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-V29BMZFJPC');
                `}
            </Script>

            {/* Google AdSense */}
            <Script 
                async 
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6285603860927889"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
        </>
    );
}