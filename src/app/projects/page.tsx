'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Smartphone } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { useState } from 'react';

const projects = [
	{
		title: 'Portfolio Website',
		description: 'This very website! Built with Next.js 15 and modern animations.',
		tech: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
		github: 'https://github.com',
		image: '/images/portfolio.webp',
	},
	{
		title: 'Odessa Website',
		description: 'A website for a FiveM server, built with Next.js and tRPC. Private repo, due to made for customer.',
		tech: ['Next.js', 'TypeScript', 'tRPC', 'Supabase', 'Tailwind'],
		github: 'https://github.com',
		image: '/images/odwebsite.webp',
		demo: 'https://odessarp.com',
	},
];

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

function ProjectImage({ project }: { project: { title: string; image?: string } }) {
	const [imageError, setImageError] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	if (!project.image || imageError) {
		return <Smartphone className='w-8 h-8 text-neutral-500 group-hover:text-neutral-400 transition-colors' strokeWidth={1.5} />;
	}

	return (
		<div className='relative w-full h-full overflow-hidden'>
			{!imageLoaded && (
				<div className='absolute inset-0 flex items-center justify-center bg-neutral-800/50'>
					<div className='w-6 h-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin'></div>
				</div>
			)}

			<Image
				src={project.image}
				alt={`${project.title} preview`}
				fill={true}
				className={`
					transition-all duration-500 group-hover:scale-105
					${imageLoaded ? 'opacity-100' : 'opacity-0'}
				`}
				style={{
					objectFit: 'cover',
					objectPosition: 'center',
				}}
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'
				quality={80}
				priority={true}
				onLoad={() => setImageLoaded(true)}
				onError={() => setImageError(true)}
			/>

			<div className='absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent group-hover:from-neutral-900/20 transition-all duration-300' />
		</div>
	);
}

export default function ProjectsPage() {
	return (
		<PageTransition>
			<div className='h-screen flex flex-col justify-center max-w-5xl mx-auto px-6'>
				<motion.div className='space-y-6' variants={containerVariants} initial='hidden' animate='visible'>
					<motion.div className='space-y-2 text-center' variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut' }}>
						<h1 className='text-3xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>Projects</h1>
						<p className='text-neutral-400'>A few things I&apos;ve built while learning and experimenting</p>
					</motion.div>

					<motion.div className='space-y-6' variants={containerVariants}>
						{projects.map((project, index) => (
							<motion.div
								key={project.title}
								variants={itemVariants}
								transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
								className='group relative bg-neutral-900/30 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-all duration-300 overflow-hidden h-50'
							>
								<div className='absolute inset-0 bg-gradient-to-r from-white/5 to-neutral-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

								<motion.div className='absolute top-3 right-3 z-20' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
									<Link href={project.github} target='_blank' rel='noopener noreferrer' aria-label='View GitHub repository'>
										<Github className='w-4 h-4 text-neutral-400 hover:text-white transition-colors' />
									</Link>
								</motion.div>

								<div className='grid grid-cols-2 h-full relative z-10'>
									<div className='p-4 flex flex-col justify-between'>
										<div className='space-y-2'>
											<div className='flex w-full justify-between'>
												<h3 className='text-lg font-semibold text-white'>{project.title}</h3>
												{project.demo && (
													<Link href={project.demo} className='inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors' target='_blank' rel='noopener noreferrer'>
														<ExternalLink className='w-3 h-3' />
														Live Demo
													</Link>
												)}
											</div>
											<p className='text-sm text-neutral-400 leading-relaxed line-clamp-2'>{project.description}</p>
										</div>

										<div className='space-y-2'>
											<div className='flex flex-wrap gap-1'>
												{project.tech.slice(0, 5).map((tech) => (
													<span key={tech} className='px-2 py-1 bg-neutral-800 text-neutral-300 rounded-full text-xs'>
														{tech}
													</span>
												))}
											</div>
										</div>
									</div>

									<div className='bg-neutral-800/50 flex items-center justify-center border-l border-neutral-700/50 group-hover:border-neutral-600/50 transition-colors relative'>
										<ProjectImage project={project} />
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	);
}
