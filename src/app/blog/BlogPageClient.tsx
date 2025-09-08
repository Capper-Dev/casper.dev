'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Shield, Search, BookOpen } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { getBlogPosts } from '@/lib/blog';

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

export default function BlogPage() {
	const posts = getBlogPosts();

	return (
		<PageTransition>
			<div className='max-w-4xl mx-auto px-6 pt-20 pb-8'>
				<motion.div className='space-y-8' variants={containerVariants} initial='hidden' animate='visible'>
					<motion.div className='space-y-4 text-center' variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut' }}>
						<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>Security Blog</h1>
						<p className='text-neutral-400 text-lg max-w-2xl mx-auto'>Insights from my security research, vulnerability discoveries, and explorations into the darker corners of technology.</p>
					</motion.div>

					<motion.div className='space-y-6' variants={containerVariants}>
						{posts.map((post, index) => {
							const CategoryIcon = getCategoryIcon(post.category);
							const categoryColor = getCategoryColor(post.category);

							return (
								<motion.article key={post.slug} variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }} className='group relative'>
									<Link href={`/blog/${post.slug}`} className='block'>
										<div className='p-6 bg-neutral-900/40 backdrop-blur-sm border border-neutral-700/50 rounded-xl hover:border-neutral-600 transition-all duration-300 relative overflow-hidden'>
											<div className='absolute inset-0 bg-gradient-to-r from-white/5 to-neutral-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

											<div className='relative z-10 space-y-4'>
												<div className='flex items-start justify-between gap-4'>
													<div className='flex-1 space-y-3'>
														<div className='flex items-center gap-3'>
															<span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${categoryColor}`}>
																<CategoryIcon className='w-4 h-4' />
																{post.category}
															</span>
															<div className='flex items-center gap-4 text-sm text-neutral-500'>
																<span className='flex items-center gap-1'>
																	<Calendar className='w-4 h-4' />
																	{new Date(post.date).toLocaleDateString('en-US', {
																		year: 'numeric',
																		month: 'long',
																		day: 'numeric',
																	})}
																</span>
																<span className='flex items-center gap-1'>
																	<Clock className='w-4 h-4' />
																	{post.readTime}
																</span>
															</div>
														</div>

														<div>
															<h2 className='text-xl font-semibold text-white group-hover:text-neutral-200 transition-colors mb-2'>{post.title}</h2>
															<p className='text-neutral-400 leading-relaxed line-clamp-2'>{post.description}</p>
														</div>

														<div className='flex flex-wrap gap-2'>
															{post.tags.map((tag) => (
																<span key={tag} className='px-2 py-1 bg-neutral-800/60 text-neutral-300 rounded text-xs'>
																	{tag}
																</span>
															))}
														</div>
													</div>

													<motion.div className='text-neutral-400 group-hover:text-white transition-colors' whileHover={{ x: 4 }}>
														<ArrowRight className='w-5 h-5' />
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
						<motion.div variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} className='text-center py-12'>
							<BookOpen className='w-12 h-12 text-neutral-600 mx-auto mb-4' />
							<p className='text-neutral-400'>No blog posts yet. Check back soon for security insights and research findings!</p>
						</motion.div>
					)}
				</motion.div>
			</div>
		</PageTransition>
	);
}
