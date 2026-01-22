"use client";

import { motion } from "framer-motion";
import {
	ArrowRight,
	BookOpen,
	Calendar,
	Clock,
	Search,
	Shield,
} from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { getBlogPosts } from "@/lib/blog";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

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

export default function BlogPage() {
	const posts = getBlogPosts();

	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl px-6 pt-20 pb-8">
				<motion.div
					className="space-y-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div
						className="space-y-4 text-center"
						variants={itemVariants}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<h1 className="bg-gradient-to-r from-white to-neutral-300 bg-clip-text font-bold text-4xl text-transparent md:text-5xl">
							Security Blog
						</h1>
						<p className="mx-auto max-w-2xl text-lg text-neutral-400">
							Insights from my security research, vulnerability discoveries, and
							explorations into the darker corners of technology.
						</p>
					</motion.div>

					<motion.div className="space-y-6" variants={containerVariants}>
						{posts.map((post, index) => {
							const CategoryIcon = getCategoryIcon(post.category);
							const categoryColor = getCategoryColor(post.category);

							return (
								<motion.article
									key={post.slug}
									variants={itemVariants}
									transition={{
										duration: 0.6,
										ease: "easeOut",
										delay: index * 0.1,
									}}
									className="group relative"
								>
									<Link href={`/blog/${post.slug}`} className="block">
										<div className="relative overflow-hidden rounded-xl border border-neutral-700/50 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-600">
											<div className="absolute inset-0 bg-gradient-to-r from-white/5 to-neutral-300/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

											<div className="relative z-10 space-y-4">
												<div className="flex items-start justify-between gap-4">
													<div className="flex-1 space-y-3">
														<div className="flex items-center gap-3">
															<span
																className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${categoryColor}`}
															>
																<CategoryIcon className="h-4 w-4" />
																{post.category}
															</span>
															<div className="flex items-center gap-4 text-neutral-500 text-sm">
																<span className="flex items-center gap-1">
																	<Calendar className="h-4 w-4" />
																	{new Date(post.date).toLocaleDateString(
																		"en-US",
																		{
																			year: "numeric",
																			month: "long",
																			day: "numeric",
																		},
																	)}
																</span>
																<span className="flex items-center gap-1">
																	<Clock className="h-4 w-4" />
																	{post.readTime}
																</span>
															</div>
														</div>

														<div>
															<h2 className="mb-2 font-semibold text-white text-xl transition-colors group-hover:text-neutral-200">
																{post.title}
															</h2>
															<p className="line-clamp-2 text-neutral-400 leading-relaxed">
																{post.description}
															</p>
														</div>

														<div className="flex flex-wrap gap-2">
															{post.tags.map((tag) => (
																<span
																	key={tag}
																	className="rounded bg-neutral-800/60 px-2 py-1 text-neutral-300 text-xs"
																>
																	{tag}
																</span>
															))}
														</div>
													</div>

													<motion.div
														className="text-neutral-400 transition-colors group-hover:text-white"
														whileHover={{ x: 4 }}
													>
														<ArrowRight className="h-5 w-5" />
													</motion.div>
												</div>
											</div>
										</div>
									</Link>
								</motion.article>
							);
						})}
					</motion.div>

					{posts.length === 0 && (
						<motion.div
							variants={itemVariants}
							transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
							className="py-12 text-center"
						>
							<BookOpen className="mx-auto mb-4 h-12 w-12 text-neutral-600" />
							<p className="text-neutral-400">
								No blog posts yet. Check back soon for security insights and
								research findings!
							</p>
						</motion.div>
					)}
				</motion.div>
			</div>
		</PageTransition>
	);
}
