import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { PersonSchema, WebsiteSchema } from '@/components/Schema';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://casper.dev'),
	title: {
		default: 'casper.dev',
		template: '%s | casper.dev',
	},
	description: 'Self-taught developer building with React, TypeScript, and Next.js',
	keywords: 'hobby programmer, React, TypeScript, Next.js, web development, Casper Truberg, portfolio, developer',
	authors: [{ name: 'Casper Truberg', url: 'https://casper.dev' }],
	creator: 'Casper Truberg',
	publisher: 'Casper Truberg',
	formatDetection: {
		telephone: false,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' data-scroll-behavior='smooth'>
			<head>
				<PersonSchema />
				<WebsiteSchema />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white relative h-screen`}>
				<div className='fixed inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 -z-10' />

				<Footer />
				<main className='relative z-10 pb-32 h-screen'>{children}</main>
			</body>
		</html>
	);
}
