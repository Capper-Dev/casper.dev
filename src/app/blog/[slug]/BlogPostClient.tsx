"use client";

import { motion } from "framer-motion";
import {
	ArrowLeft,
	BookOpen,
	Calendar,
	Clock,
	ExternalLink,
	Search,
	Shield,
} from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import type { BlogPost } from "@/lib/blog";

interface Props {
	post: BlogPost;
}

type MarkdownElement =
	| { type: "h1" | "h2" | "h3" | "p"; content: string }
	| { type: "code"; content: string; language: string }
	| { type: "list"; items: string[] };

type InlinePart =
	| { type: "text"; content: string }
	| { type: "bold"; content: string }
	| { type: "code"; content: string };

function getCategoryIcon(category: string) {
	switch (category) {
		case "Security":
			return Shield;
		case "Research":
			return Search;
		default:
			return BookOpen;
	}
}

function getCategoryColor(category: string) {
	switch (category) {
		case "Security":
			return "bg-red-500/20 text-red-400 border-red-500/30";
		case "Research":
			return "bg-blue-500/20 text-blue-400 border-blue-500/30";
		default:
			return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
	}
}

function parseInlineMarkdown(text: string): InlinePart[] {
	const parts: InlinePart[] = [];
	let currentText = "";
	let i = 0;

	while (i < text.length) {
		if (text[i] === "*" && text[i + 1] === "*") {
			if (currentText) {
				parts.push({ type: "text", content: currentText });
				currentText = "";
			}
			i += 2;
			let boldText = "";
			while (i < text.length - 1 && !(text[i] === "*" && text[i + 1] === "*")) {
				boldText += text[i];
				i++;
			}
			if (i < text.length - 1) {
				parts.push({ type: "bold", content: boldText });
				i += 2;
			} else {
				currentText += `**${boldText}`;
			}
		} else if (text[i] === "`") {
			if (currentText) {
				parts.push({ type: "text", content: currentText });
				currentText = "";
			}
			i++;
			let codeText = "";
			while (i < text.length && text[i] !== "`") {
				codeText += text[i];
				i++;
			}
			if (i < text.length) {
				parts.push({ type: "code", content: codeText });
				i++;
			} else {
				currentText += `\`${codeText}`;
			}
		} else {
			currentText += text[i];
			i++;
		}
	}

	if (currentText) {
		parts.push({ type: "text", content: currentText });
	}

	return parts;
}

function renderInlineContent(text: string) {
	const parts = parseInlineMarkdown(text);

	return parts.map((part, index) => {
		const key = `${part.type}-${index}-${part.content.slice(0, 20)}`;
		switch (part.type) {
			case "bold":
				return (
					<strong key={key} className="font-semibold text-white">
						{part.content}
					</strong>
				);
			case "code":
				return (
					<code
						key={key}
						className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-neutral-200 text-sm"
					>
						{part.content}
					</code>
				);
			default:
				return part.content;
		}
	});
}

function MarkdownContent({ content }: { content: string }) {
	const lines = content.trim().split("\n");
	const elements: MarkdownElement[] = [];
	let currentElement = "";
	let elementType: "p" | "h1" | "h2" | "h3" = "p";
	let isCodeBlock = false;
	let codeLanguage = "";
	let listItems: string[] = [];
	let isInList = false;

	const flushCurrentElement = () => {
		if (currentElement.trim()) {
			if (isInList) {
				listItems.push(currentElement.trim());
			} else {
				elements.push({ type: elementType, content: currentElement.trim() });
			}
			currentElement = "";
		}
	};

	const flushList = () => {
		if (listItems.length > 0) {
			elements.push({ type: "list", items: [...listItems] });
			listItems = [];
			isInList = false;
		}
	};

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.startsWith("```")) {
			if (isCodeBlock) {
				elements.push({
					type: "code",
					content: currentElement.trim(),
					language: codeLanguage,
				});
				currentElement = "";
				isCodeBlock = false;
				codeLanguage = "";
			} else {
				flushCurrentElement();
				flushList();
				isCodeBlock = true;
				codeLanguage = line.replace("```", "");
			}
			continue;
		}

		if (isCodeBlock) {
			currentElement += `${line}\n`;
			continue;
		}

		if (line.startsWith("# ")) {
			flushCurrentElement();
			flushList();
			elements.push({ type: "h1", content: line.replace("# ", "") });
		} else if (line.startsWith("## ")) {
			flushCurrentElement();
			flushList();
			elements.push({ type: "h2", content: line.replace("## ", "") });
		} else if (line.startsWith("### ")) {
			flushCurrentElement();
			flushList();
			elements.push({ type: "h3", content: line.replace("### ", "") });
		} else if (line.match(/^\d+\./)) {
			flushCurrentElement();
			if (!isInList) {
				flushList();
				isInList = true;
			}
			listItems.push(line.replace(/^\d+\.\s*/, ""));
		} else if (line.startsWith("- ")) {
			flushCurrentElement();
			if (!isInList) {
				flushList();
				isInList = true;
			}
			listItems.push(line.replace(/^-\s*/, ""));
		} else if (line === "") {
			flushCurrentElement();
			if (isInList) {
				flushList();
			}
			elementType = "p";
		} else {
			if (isInList && !line.startsWith("- ") && !line.match(/^\d+\./)) {
				flushList();
			}
			if (currentElement) currentElement += " ";
			currentElement += line;
			elementType = "p";
		}
	}

	flushCurrentElement();
	flushList();

	return (
		<div className="prose prose-invert max-w-none">
			{elements.map((element, index) => {
				const contentPreview =
					element.type === "list"
						? element.items[0]?.slice(0, 30) || ""
						: element.content.slice(0, 30);
				const key = `${element.type}-${index}-${contentPreview}`;

				switch (element.type) {
					case "h1":
						return (
							<h1
								key={key}
								className="mt-8 mb-6 font-bold text-2xl text-white md:text-3xl"
							>
								{renderInlineContent(element.content)}
							</h1>
						);
					case "h2":
						return (
							<h2
								key={key}
								className="mt-8 mb-4 font-semibold text-neutral-200 text-xl md:text-2xl"
							>
								{renderInlineContent(element.content)}
							</h2>
						);
					case "h3":
						return (
							<h3
								key={key}
								className="mt-6 mb-3 font-medium text-lg text-neutral-300 md:text-xl"
							>
								{renderInlineContent(element.content)}
							</h3>
						);
					case "code":
						return (
							<pre
								key={key}
								className="my-4 overflow-x-auto rounded-lg border border-neutral-700 bg-neutral-900 p-4"
							>
								<code className="font-mono text-neutral-300 text-sm">
									{element.content}
								</code>
							</pre>
						);
					case "list":
						return (
							<ul
								key={key}
								className="mb-4 list-inside list-disc space-y-2 text-neutral-300"
							>
								{element.items.map((item, itemIndex) => {
									const itemKey = `${key}-item-${itemIndex}-${item.slice(0, 20)}`;
									return (
										<li key={itemKey} className="leading-relaxed">
											{renderInlineContent(item)}
										</li>
									);
								})}
							</ul>
						);
					default:
						return (
							<p key={key} className="mb-4 text-neutral-300 leading-relaxed">
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
			<div className="mx-auto max-w-4xl px-6 pt-20 pb-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="space-y-8"
				>
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-neutral-400 transition-colors hover:text-white"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Blog
					</Link>

					<header className="space-y-6">
						<div className="flex items-center gap-3">
							<span
								className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${categoryColor}`}
							>
								<CategoryIcon className="h-4 w-4" />
								{post.category}
							</span>
						</div>

						<h1 className="bg-gradient-to-r from-white to-neutral-300 bg-clip-text font-bold text-3xl text-transparent md:text-4xl lg:text-5xl">
							{post.title}
						</h1>

						<p className="text-lg text-neutral-400 leading-relaxed">
							{post.description}
						</p>

						<div className="flex items-center gap-6 border-neutral-800 border-b pb-6 text-neutral-500 text-sm">
							<span className="flex items-center gap-2">
								<Calendar className="h-4 w-4" />
								{new Date(post.date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</span>
							<span className="flex items-center gap-2">
								<Clock className="h-4 w-4" />
								{post.readTime}
							</span>
						</div>

						<div className="flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="rounded-full bg-neutral-800/60 px-3 py-1 text-neutral-300 text-sm"
								>
									{tag}
								</span>
							))}
						</div>
					</header>

					<article className="space-y-6">
						<MarkdownContent content={post.content} />
					</article>

					<footer className="border-neutral-800 border-t pt-8 pb-32">
						<div className="rounded-lg border border-yellow-600/30 bg-yellow-900/20 p-4">
							<div className="flex items-start gap-3">
								<ExternalLink className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />
								<div>
									<p className="mb-1 font-medium text-yellow-200">
										Responsible Disclosure
									</p>
									<p className="text-sm text-yellow-300/80">
										This vulnerability has been reported to the appropriate
										parties. This research is shared for educational purposes
										and to promote better security practices.
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
