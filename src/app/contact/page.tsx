import { generateMetadata as genMeta } from "@/lib/metadata";
import ContactPageClient from "./ContactPageClient";

export const metadata = genMeta({
	title: "Contact",
	description:
		"Get in touch with Casper Truberg. Open to projects, collaborations, and opportunities. Reach out via email, GitHub, or Discord.",
	keywords:
		"contact Casper Truberg, hire developer, React developer contact, TypeScript developer, web development collaboration, freelance developer Denmark",
	path: "/contact",
});

export default function ContactPage() {
	return <ContactPageClient />;
}
