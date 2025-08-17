import { generateMetadata as genMeta } from '@/lib/metadata';
import HomePageClient from './HomePageClient';

export const metadata = genMeta({
	title: 'casper.dev',
	description: "Hi, I'm Casper Truberg, a self-taught hobby programmer who loves building modern web applications with React, TypeScript, and Next.js. Welcome to my portfolio.",
	keywords: 'Casper Truberg, portfolio, self-taught developer, hobby programmer, React developer, TypeScript, Next.js, web development, Denmark, modern web applications',
});

export default function HomePage() {
	return <HomePageClient />;
}
