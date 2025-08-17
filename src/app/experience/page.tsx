import { generateMetadata as genMeta } from '@/lib/metadata';
import ExperiencePageClient from './ExperiencePageClient';

export const metadata = genMeta({
	title: 'Experience',
	description: 'Explore my self-taught journey through modern web development. From frontend design with React and Tailwind CSS to full-stack development with Node.js, tRPC, and Supabase.',
	keywords: 'Casper Truberg experience, web development skills, React experience, TypeScript experience, Next.js projects, Tailwind CSS, tRPC, Supabase, Node.js, self-taught programmer skills',
	path: '/experience',
});

export default function ExperiencePage() {
	return <ExperiencePageClient />;
}
