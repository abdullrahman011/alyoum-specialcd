import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/components/AuthProvider';
import GoogleTags from '@/components/GoogleTags';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aofer | أوفر",
  description: "كُن على اطلاع بأخر العروض اليومية",
  icons: {
    icon: '/special day.png',
    shortcut: '/special day.png',
    apple: '/special day.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleTags />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}