import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'casper.dev',
	description: 'Self-taught developer building with React, TypeScript, and Next.js',
	keywords: 'hobby programmer, React, TypeScript, Next.js, web development, Casper Truberg',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='scroll-smooth'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white h-screen overflow-hidden`}>
				<div className='fixed inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900' />

				<div
					className='fixed inset-0 opacity-20'
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
						backgroundSize: '40px 40px',
					}}
				/>

				<div className='fixed top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse blur-sm' />
				<div className='fixed top-1/3 right-1/3 w-3 h-3 bg-neutral-300/20 rounded-full animate-bounce blur-sm' style={{ animationDuration: '4s' }} />
				<div className='fixed bottom-1/3 left-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping blur-sm' style={{ animationDuration: '6s' }} />
				<div className='fixed top-2/3 right-1/4 w-1.5 h-1.5 bg-neutral-400/20 rounded-full animate-pulse blur-sm' style={{ animationDuration: '5s' }} />

				<Footer />
				<main className='relative z-10 h-screen pt-20'>{children}</main>
			</body>
		</html>
	);
}
