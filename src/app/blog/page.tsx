import { generateMetadata as genMeta } from "@/lib/metadata";
import BlogPageClient from "./BlogPageClient";

export const metadata = genMeta({
	title: "Security Blog",
	description:
		"Insights from my security research, vulnerability discoveries, and explorations into cybersecurity. Technical analysis of FiveM encryption, reverse engineering, and responsible disclosure.",
	keywords:
		"security blog, cybersecurity research, FiveM security, reverse engineering, vulnerability research, encryption analysis, responsible disclosure, security analysis",
	path: "/blog",
});

export default function BlogPage() {
	return <BlogPageClient />;
}
