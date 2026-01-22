import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/blog";
import { generateMetadata as genMeta } from "@/lib/metadata";
import BlogPostClient from "./BlogPostClient";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const post = getBlogPost(slug);

	if (!post) {
		return genMeta({
			title: "Post Not Found",
			description: "The blog post you are looking for does not exist.",
			noIndex: true,
		});
	}

	return genMeta({
		title: post.title,
		description: post.description,
		keywords: `${post.tags.join(", ")}, security blog, cybersecurity research, Casper Truberg`,
	});
}

export default async function BlogPost({ params }: Props) {
	const { slug } = await params;
	const post = getBlogPost(slug);

	if (!post) {
		notFound();
	}

	return <BlogPostClient post={post} />;
}
