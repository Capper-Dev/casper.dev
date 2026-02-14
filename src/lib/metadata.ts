import type { Metadata } from "next";

interface PageMetadata {
	title: string;
	description: string;
	keywords?: string;
	ogImage?: string;
	noIndex?: boolean;
	path?: string;
	noSuffix?: boolean;
}

const baseUrl = "https://www.casper.dev";

export function generateMetadata({
	title,
	description,
	keywords,
	ogImage = "/opengraph-image",
	noIndex = false,
	path = "",
	noSuffix = false,
}: PageMetadata): Metadata {
	const fullTitle = noSuffix ? title : `${title} | casper.dev`;
	const url = `${baseUrl}${path}`;

	const ogImageUrl = `${baseUrl}${ogImage}`;

	return {
		title: fullTitle,
		description,
		keywords,
		authors: [{ name: "Casper Truberg" }],
		creator: "Casper Truberg",
		publisher: "Casper Truberg",
		robots: noIndex
			? { index: false, follow: false }
			: { index: true, follow: true, googleBot: { index: true, follow: true } },
		openGraph: {
			type: "website",
			url,
			title: fullTitle,
			description,
			siteName: "casper.dev",
			locale: "en_US",
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: `${fullTitle} - casper.dev`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description,
			images: [ogImageUrl],
		},
		alternates: {
			canonical: url,
		},
	};
}
