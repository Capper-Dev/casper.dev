'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Shield, Search, BookOpen, ExternalLink } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { BlogPost } from '@/lib/blog';

interface Props {
	post: BlogPost;
}

type MarkdownElement = { type: 'h1' | 'h2' | 'h3' | 'p'; content: string } | { type: 'code'; content: string; language: string } | { type: 'list'; items: string[] };

type InlinePart = { type: 'text'; content: string } | { type: 'bold'; content: string } | { type: 'code'; content: string };

function getCategoryIcon(category: string) {
	switch (category) {
		case 'Security':
			return Shield;
		case 'Research':
			return Search;
		default:
			return BookOpen;
	}
}

function getCategoryColor(category: string) {
	switch (category) {
		case 'Security':
			return 'bg-red-500/20 text-red-400 border-red-500/30';
		case 'Research':
			return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
		default:
			return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
	}
}

function parseInlineMarkdown(text: string): InlinePart[] {
	const parts: InlinePart[] = [];
	let currentText = '';
	let i = 0;

	while (i < text.length) {
		if (text[i] === '*' && text[i + 1] === '*') {
			if (currentText) {
				parts.push({ type: 'text', content: currentText });
				currentText = '';
			}
			i += 2;
			let boldText = '';
			while (i < text.length - 1 && !(text[i] === '*' && text[i + 1] === '*')) {
				boldText += text[i];
				i++;
			}
			if (i < text.length - 1) {
				parts.push({ type: 'bold', content: boldText });
				i += 2;
			} else {
				currentText += '**' + boldText;
			}
		} else if (text[i] === '`') {
			if (currentText) {
				parts.push({ type: 'text', content: currentText });
				currentText = '';
			}
			i++;
			let codeText = '';
			while (i < text.length && text[i] !== '`') {
				codeText += text[i];
				i++;
			}
			if (i < text.length) {
				parts.push({ type: 'code', content: codeText });
				i++;
			} else {
				currentText += '`' + codeText;
			}
		} else {
			currentText += text[i];
			i++;
		}
	}

	if (currentText) {
		parts.push({ type: 'text', content: currentText });
	}

	return parts;
}

function renderInlineContent(text: string) {
	const parts = parseInlineMarkdown(text);

	return parts.map((part, index) => {
		switch (part.type) {
			case 'bold':
				return (
					<strong key={index} className='font-semibold text-white'>
						{part.content}
					</strong>
				);
			case 'code':
				return (
					<code key={index} className='bg-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono text-neutral-200'>
						{part.content}
					</code>
				);
			default:
				return part.content;
		}
	});
}

function MarkdownContent({ content }: { content: string }) {
	const lines = content.trim().split('\n');
	const elements: MarkdownElement[] = [];
	let currentElement = '';
	let elementType: 'p' | 'h1' | 'h2' | 'h3' = 'p';
	let isCodeBlock = false;
	let codeLanguage = '';
	let listItems: string[] = [];
	let isInList = false;

	const flushCurrentElement = () => {
		if (currentElement.trim()) {
			if (isInList) {
				listItems.push(currentElement.trim());
			} else {
				elements.push({ type: elementType, content: currentElement.trim() });
			}
			currentElement = '';
		}
	};

	const flushList = () => {
		if (listItems.length > 0) {
			elements.push({ type: 'list', items: [...listItems] });
			listItems = [];
			isInList = false;
		}
	};

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.startsWith('```')) {
			if (isCodeBlock) {
				elements.push({ type: 'code', content: currentElement.trim(), language: codeLanguage });
				currentElement = '';
				isCodeBlock = false;
				codeLanguage = '';
			} else {
				flushCurrentElement();
				flushList();
				isCodeBlock = true;
				codeLanguage = line.replace('```', '');
			}
			continue;
		}

		if (isCodeBlock) {
			currentElement += line + '\n';
			continue;
		}

		if (line.startsWith('# ')) {
			flushCurrentElement();
			flushList();
			elements.push({ type: 'h1', content: line.replace('# ', '') });
		} else if (line.startsWith('## ')) {
			flushCurrentElement();
			flushList();
			elements.push({ type: 'h2', content: line.replace('## ', '') });
		} else if (line.startsWith('### ')) {
			flushCurrentElement();
			flushList();
			elements.push({ type: 'h3', content: line.replace('### ', '') });
		} else if (line.match(/^\d+\./)) {
			flushCurrentElement();
			if (!isInList) {
				flushList();
				isInList = true;
			}
			listItems.push(line.replace(/^\d+\.\s*/, ''));
		} else if (line.startsWith('- ')) {
			flushCurrentElement();
			if (!isInList) {
				flushList();
				isInList = true;
			}
			listItems.push(line.replace(/^-\s*/, ''));
		} else if (line === '') {
			flushCurrentElement();
			if (isInList) {
				flushList();
			}
			elementType = 'p';
		} else {
			if (isInList && !line.startsWith('- ') && !line.match(/^\d+\./)) {
				flushList();
			}
			if (currentElement) currentElement += ' ';
			currentElement += line;
			elementType = 'p';
		}
	}

	flushCurrentElement();
	flushList();

	return (
		<div className='prose prose-invert max-w-none'>
			{elements.map((element, index) => {
				switch (element.type) {
					case 'h1':
						return (
							<h1 key={index} className='text-2xl md:text-3xl font-bold text-white mb-6 mt-8'>
								{renderInlineContent(element.content)}
							</h1>
						);
					case 'h2':
						return (
							<h2 key={index} className='text-xl md:text-2xl font-semibold text-neutral-200 mb-4 mt-8'>
								{renderInlineContent(element.content)}
							</h2>
						);
					case 'h3':
						return (
							<h3 key={index} className='text-lg md:text-xl font-medium text-neutral-300 mb-3 mt-6'>
								{renderInlineContent(element.content)}
							</h3>
						);
					case 'code':
						return (
							<pre key={index} className='bg-neutral-900 border border-neutral-700 rounded-lg p-4 overflow-x-auto my-4'>
								<code className='text-sm text-neutral-300 font-mono'>{element.content}</code>
							</pre>
						);
					case 'list':
						return (
							<ul key={index} className='list-disc list-inside space-y-2 mb-4 text-neutral-300'>
								{element.items.map((item, itemIndex) => (
									<li key={itemIndex} className='leading-relaxed'>
										{renderInlineContent(item)}
									</li>
								))}
							</ul>
						);
					default:
						return (
							<p key={index} className='text-neutral-300 leading-relaxed mb-4'>
								{renderInlineContent(element.content)}
							</p>
						);
				}
			})}
		</div>
	);
}

export default function BlogPostClient({ post }: Props) {
	const CategoryIcon = getCategoryIcon(post.category);
	const categoryColor = getCategoryColor(post.category);

	return (
		<PageTransition>
			<div className='max-w-4xl mx-auto px-6 pt-20 pb-8'>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className='space-y-8'>
					<Link href='/blog' className='inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors'>
						<ArrowLeft className='w-4 h-4' />
						Back to Blog
					</Link>

					<header className='space-y-6'>
						<div className='flex items-center gap-3'>
							<span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${categoryColor}`}>
								<CategoryIcon className='w-4 h-4' />
								{post.category}
							</span>
						</div>

						<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>{post.title}</h1>

						<p className='text-lg text-neutral-400 leading-relaxed'>{post.description}</p>

						<div className='flex items-center gap-6 text-sm text-neutral-500 pb-6 border-b border-neutral-800'>
							<span className='flex items-center gap-2'>
								<Calendar className='w-4 h-4' />
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
							<span className='flex items-center gap-2'>
								<Clock className='w-4 h-4' />
								{post.readTime}
							</span>
						</div>

						<div className='flex flex-wrap gap-2'>
							{post.tags.map((tag) => (
								<span key={tag} className='px-3 py-1 bg-neutral-800/60 text-neutral-300 rounded-full text-sm'>
									{tag}
								</span>
							))}
						</div>
					</header>

					<article className='space-y-6'>
						<MarkdownContent content={post.content} />
					</article>

					<footer className='pt-8 border-t border-neutral-800'>
						<div className='bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4'>
							<div className='flex items-start gap-3'>
								<ExternalLink className='w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5' />
								<div>
									<p className='text-yellow-200 font-medium mb-1'>Responsible Disclosure</p>
									<p className='text-yellow-300/80 text-sm'>
										This vulnerability has been reported to the appropriate parties. This research is shared for educational purposes and to promote better security practices.
									</p>
								</div>
							</div>
						</div>
					</footer>
				</motion.div>
			</div>
		</PageTransition>
	);
}
