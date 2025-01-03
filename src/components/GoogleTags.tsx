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
                    gtag('config', 'G-V29BMZFJPC', {
                        cookie_flags: 'SameSite=None;Secure'
                    });
                `}
            </Script>

            {/* Google AdSense */}
            <Script 
                id="adsbygoogle"
                async 
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                data-ad-client="ca-pub-6285603860927889"
                strategy="lazyOnload"
                crossOrigin="anonymous"
                onLoad={() => {
                    console.log('AdSense loaded successfully');
                }}
                onError={(e) => {
                    console.error('AdSense loading error:', e);
                }}
            />
        </>
    );
}