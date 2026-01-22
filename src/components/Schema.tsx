export function PersonSchema() {
	const schema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Casper Truberg",
		jobTitle: "Self-Taught Developer",
		url: "https://casper.dev",
		sameAs: ["https://github.com/Capper-Dev"],
		knowsAbout: [
			"React",
			"TypeScript",
			"Next.js",
			"Web Development",
			"JavaScript",
			"Security Research",
		],
		description:
			"Self-taught hobby programmer specializing in modern web development with React, TypeScript, and Next.js.",
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - JSON.stringify escapes all content for JSON-LD structured data
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}

export function WebsiteSchema() {
	const schema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "casper.dev",
		url: "https://casper.dev",
		description:
			"Portfolio of Casper Truberg, a self-taught developer building modern web applications.",
		author: {
			"@type": "Person",
			name: "Casper Truberg",
		},
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - JSON.stringify escapes all content for JSON-LD structured data
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}
