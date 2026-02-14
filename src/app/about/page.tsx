import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = genMeta({
	title: "About",
	description:
		"Learn about Casper Truberg, a self-taught developer from Denmark building modern web apps with React, TypeScript, and Next.js.",
	keywords:
		"about Casper Truberg, self-taught developer, React developer, TypeScript developer, Next.js developer, hobby programmer, web development journey, Denmark developer",
	path: "/about",
});

export default function AboutPage() {
	return <AboutPageClient />;
}
