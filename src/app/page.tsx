import { generateMetadata as genMeta } from "@/lib/metadata";
import HomePageClient from "./HomePageClient";

export const metadata = genMeta({
	title: "Casper Truberg - Self-Taught Developer Portfolio",
	description:
		"Hi, I'm Casper Truberg, a self-taught developer building modern web apps with React, TypeScript, and Next.js. Welcome to my portfolio.",
	keywords:
		"Casper Truberg, portfolio, self-taught developer, hobby programmer, React developer, TypeScript, Next.js, web development, Denmark, modern web applications",
	noSuffix: true,
});

export default function HomePage() {
	return <HomePageClient />;
}
