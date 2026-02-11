import { generateMetadata as genMeta } from "@/lib/metadata";
import ExperiencePageClient from "./ExperiencePageClient";

export const metadata = genMeta({
	title: "Experience",
	description:
		"Casper Truberg's self-taught web development journey. From React and Tailwind CSS frontend to full-stack with Node.js, tRPC, and Supabase.",
	keywords:
		"Casper Truberg experience, web development skills, React experience, TypeScript experience, Next.js projects, Tailwind CSS, tRPC, Supabase, Node.js, self-taught programmer skills",
	path: "/experience",
});

export default function ExperiencePage() {
	return <ExperiencePageClient />;
}
