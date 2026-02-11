import { generateMetadata as genMeta } from "@/lib/metadata";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata = genMeta({
	title: "Projects",
	description:
		"Web development projects by Casper Truberg, built with React, TypeScript, Next.js, and modern technologies.",
	keywords:
		"Casper Truberg projects, React projects, TypeScript projects, Next.js portfolio, web development portfolio, GitHub projects, FiveM website, portfolio website",
	path: "/projects",
});

export default function ProjectsPage() {
	return <ProjectsPageClient />;
}
