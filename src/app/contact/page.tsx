import { generateMetadata as genMeta } from '@/lib/metadata';
import ContactPageClient from './ContactPageClient';

export const metadata = genMeta({
	title: 'Contact',
	description: 'Get in touch with Casper Truberg. Open to interesting projects, collaborations, and opportunities. Contact via email, GitHub, or Discord for web development discussions.',
	keywords: 'contact Casper Truberg, hire developer, React developer contact, TypeScript developer, web development collaboration, freelance developer Denmark',
	path: '/contact',
});

export default function ContactPage() {
	return <ContactPageClient />;
}
