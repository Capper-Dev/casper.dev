import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/blog';
import BlogPostClient from './BlogPostClient';

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
	const { slug } = await params;
	const post = getBlogPost(slug);

	if (!post) {
		notFound();
	}

	return <BlogPostClient post={post} />;
}
