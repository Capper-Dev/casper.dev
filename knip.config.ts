import type { KnipConfig } from "knip";

const config: KnipConfig = {
	entry: [
		"src/app/**/page.tsx",
		"src/app/**/layout.tsx",
		"src/app/**/not-found.tsx",
	],
	project: ["src/**/*.{ts,tsx}"],
	ignore: [
		"src/**/*.test.{ts,tsx}",
		"src/**/*.spec.{ts,tsx}",
		"node_modules/**",
	],
};

export default config;
