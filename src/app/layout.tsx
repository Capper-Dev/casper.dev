import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { PersonSchema, WebsiteSchema } from "@/components/Schema";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://www.casper.dev"),
	title: {
		default: "casper.dev",
		template: "%s | casper.dev",
	},
	description:
		"Self-taught developer building with React, TypeScript, and Next.js",
	keywords:
		"hobby programmer, React, TypeScript, Next.js, web development, Casper Truberg, portfolio, developer",
	authors: [{ name: "Casper Truberg", url: "https://www.casper.dev" }],
	creator: "Casper Truberg",
	publisher: "Casper Truberg",
	formatDetection: {
		telephone: false,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" data-scroll-behavior="smooth">
			<head>
				<meta charSet="utf-8" />
				<link rel="preconnect" href="https://cdn.jsdelivr.net" />
				<link
					rel="preconnect"
					href="https://cdn.jsdelivr.net"
					crossOrigin="anonymous"
				/>
				<PersonSchema />
				<WebsiteSchema />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} relative h-screen bg-black text-white antialiased`}
			>
				<div className="fixed inset-0 -z-10 bg-gradient-to-br from-neutral-900 via-black to-neutral-900" />

				<Footer />
				<main className="relative z-10 h-screen pb-32">{children}</main>
			</body>
		</html>
	);
}
