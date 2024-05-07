import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Footer from './components/Footer';
import Menu from './components/Menu';
import './globals.css';

dayjs.locale('zh-cn');

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'BBBigCat.github.io',
    description: '个人站点',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="max-w-3xl mx-auto px-2">
                <Menu />
                {children}
                <Footer />
            </body>
        </html>
    );
}
