import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DesignShell } from "@/components/layout/DesignShell";
import { PersonSchema, WebsiteSchema } from "@/components/Schema";
import { DesignProvider } from "@/lib/design-context";

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

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#000000",
};

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
	openGraph: {
		type: "website",
		siteName: "casper.dev",
		url: "https://www.casper.dev",
		locale: "en_US",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "casper.dev - Casper Truberg's portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		images: ["/opengraph-image"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://cdn.jsdelivr.net" />
				<link
					rel="preconnect"
					href="https://cdn.jsdelivr.net"
					crossOrigin="anonymous"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<PersonSchema />
				<WebsiteSchema />
				<DesignProvider>
					<DesignShell>{children}</DesignShell>
				</DesignProvider>
			</body>
		</html>
	);
}
