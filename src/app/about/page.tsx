import { generateMetadata as genMeta } from "@/lib/metadata";
import AboutPageClient from "./AboutPageClient";

export const metadata = genMeta({
	title: "About",
	description:
		"Learn about Casper Truberg, a self-taught hobby programmer from Denmark specializing in React, TypeScript, and Next.js development. Discover my journey and what drives my passion for coding.",
	keywords:
		"about Casper Truberg, self-taught developer, React developer, TypeScript developer, Next.js developer, hobby programmer, web development journey, Denmark developer",
	path: "/about",
});

export default function AboutPage() {
	return <AboutPageClient />;
}
