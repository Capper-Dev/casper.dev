'use client';

import { motion } from 'framer-motion';
import { Code2, Heart, Lightbulb } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import Image from 'next/image';

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

const technologies = [
	{ name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
	{ name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
	{ name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
	{ name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
	{ name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
	{ name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
];

export default function AboutPage() {
	return (
		<PageTransition>
			<div className='h-screen flex flex-col justify-center max-w-3xl mx-auto px-6'>
				<motion.div className='space-y-6' variants={containerVariants} initial='hidden' animate='visible'>
					<motion.div className='space-y-2 text-center' variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut' }}>
						<h1 className='text-3xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>About Me</h1>
						<p className='text-neutral-400'>A bit about my journey and what drives me</p>
					</motion.div>

					<motion.div className='grid md:grid-cols-2 gap-4 text-sm' variants={containerVariants}>
						<motion.div
							className='flex items-start gap-3 p-4 bg-gradient-to-r from-white/5 to-neutral-300/5 border border-neutral-700/50 rounded-xl'
							variants={itemVariants}
							transition={{ duration: 0.6, ease: 'easeOut' }}
							whileHover={{ scale: 1.02 }}
						>
							<Code2 className='w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0' />
							<p className='text-neutral-300'>
								My journey started with curiosity about how websites worked. What began as tinkering quickly became a genuine passion for building digital experiences.
							</p>
						</motion.div>

						<motion.div
							className='flex items-start gap-3 p-4 bg-gradient-to-r from-neutral-400/5 to-neutral-600/5 border border-neutral-700/50 rounded-xl'
							variants={itemVariants}
							transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
							whileHover={{ scale: 1.02 }}
						>
							<Lightbulb className='w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0' />
							<p className='text-neutral-300'>I&apos;m completely self-taught, learning through online resources and lots of trial and error. This path taught me to be resourceful and persistent.</p>
						</motion.div>

						<motion.div
							className='flex items-start gap-3 p-4 bg-gradient-to-r from-neutral-600/5 to-white/5 border border-neutral-700/50 rounded-xl md:col-span-2'
							variants={itemVariants}
							transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
							whileHover={{ scale: 1.02 }}
						>
							<Heart className='w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0' />
							<p className='text-neutral-300'>
								Currently focused on modern web development with React, TypeScript, and Next.js. I love the entire process—from planning to deployment. There&apos;s something magical about turning
								ideas into working applications.
							</p>
						</motion.div>
					</motion.div>

					<motion.div className='space-y-4' variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}>
						<h2 className='text-xl font-semibold text-center'>What I Mainly Work With</h2>
						<motion.div className='grid grid-cols-3 md:grid-cols-6 gap-3' variants={containerVariants}>
							{technologies.map((tech, index) => (
								<motion.div
									key={tech.name}
									variants={itemVariants}
									transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 + index * 0.05 }}
									whileHover={{ scale: 1.05, y: -2 }}
									className='p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-center text-xs hover:border-neutral-700 transition-colors group cursor-default'
								>
									<div className='mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center'>
										<Image src={tech.icon} alt={tech.name} width={32} height={32} className='object-contain' />
									</div>
									<span className='text-neutral-300'>{tech.name}</span>
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	);
}
