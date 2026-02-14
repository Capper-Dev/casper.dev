import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		formats: ["image/webp", "image/avif"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		minimumCacheTTL: 60,
	},
	compress: true,
	poweredByHeader: false,
	reactStrictMode: true,

	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Content-Signal",
						value: "search=yes, ai-train=no",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.jsdelivr.net https://*.casper.dev; font-src 'self'; connect-src 'self'; frame-ancestors 'none';",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
					},
				],
			},
		];
	},
};

export default nextConfig;
