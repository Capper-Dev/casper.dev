'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/layout/PageTransition';
import { useEffect, useState } from 'react';
import { DrizzleIcon } from '@/components/ui/Icons';

const skills = [
	{ name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
	{ name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
	{ name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
	{ name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
	{ name: 'tRPC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trpc/trpc-original.svg' },
	{ name: 'Drizzle', icon: 'custom', component: DrizzleIcon },
	{ name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
	{ name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
	{ name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
	{ name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
	{ name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
	{ name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
];

const FloatingSkill = ({ skill, index }: { skill: any; index: number }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const randomX = Math.random() * 80 + 10;
	const randomY = Math.random() * 70 + 15;
	const randomDelay = Math.random() * 3;
	const randomDuration = 15 + Math.random() * 10;

	const renderIcon = () => {
		if (skill.icon === 'custom' && skill.component) {
			const IconComponent = skill.component;
			return <IconComponent className='w-full h-full filter brightness-75' />;
		} else if (skill.icon === 'mantine') {
			return (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='w-full h-full filter brightness-75'
				>
					<path stroke='none' d='M0 0h24v24H0z' fill='none' />
					<path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
					<path d='M11 16c1.22 -.912 2 -2.36 2 -4a5.01 5.01 0 0 0 -2 -4' />
					<path d='M14 9h-2' />
					<path d='M14 15h-2' />
					<path d='M10 12h.01' />
				</svg>
			);
		} else {
			return <img src={skill.icon} alt={skill.name} className='w-full h-full object-contain filter brightness-75' />;
		}
	};

	return (
		<motion.div
			className='fixed pointer-events-none z-0'
			initial={{
				left: `${randomX}%`,
				top: `${randomY}%`,
				opacity: 0,
				scale: 0.8,
			}}
			animate={{
				opacity: 0.4,
				scale: 1,
				x: [0, 30, -20, 15, 0],
				y: [0, -25, 20, -10, 0],
			}}
			transition={{
				opacity: { delay: randomDelay, duration: 1 },
				scale: { delay: randomDelay, duration: 1 },
				x: {
					delay: randomDelay,
					duration: randomDuration,
					repeat: Infinity,
					ease: 'easeInOut',
				},
				y: {
					delay: randomDelay,
					duration: randomDuration + 3,
					repeat: Infinity,
					ease: 'easeInOut',
				},
			}}
		>
			<div className='w-12 h-12 bg-neutral-900/20 border border-neutral-800/30 rounded-lg flex items-center justify-center backdrop-blur-sm p-2'>{renderIcon()}</div>
		</motion.div>
	);
};

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

export default function ExperiencePage() {
	return (
		<PageTransition>
			{skills.map((skill, index) => (
				<FloatingSkill key={skill.name} skill={skill} index={index} />
			))}

			<div className='h-screen flex flex-col justify-center max-w-3xl mx-auto px-6 relative z-10'>
				<motion.div className='space-y-8' variants={containerVariants} initial='hidden' animate='visible'>
					<motion.div className='space-y-4 text-center' variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut' }}>
						<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>Experience</h1>
						<p className='text-neutral-400 text-lg'>My self-taught journey through modern web development</p>
					</motion.div>

					<motion.div className='grid md:grid-cols-2 gap-6' variants={containerVariants}>
						<motion.div
							className='p-6 bg-neutral-900/40 backdrop-blur-sm border border-neutral-700/50 rounded-xl'
							variants={itemVariants}
							transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
							whileHover={{ scale: 1.02, y: -2 }}
						>
							<h3 className='text-xl font-semibold mb-3 text-neutral-200'>Frontend & Design</h3>
							<p className='text-sm text-neutral-400 leading-relaxed'>
								Building modern interfaces with React, TypeScript, and Next.js. Using Tailwind CSS for rapid styling and Lucide/Phosphor icons for clean iconography. Explored Mantine for component
								libraries.
							</p>
						</motion.div>

						<motion.div
							className='p-6 bg-neutral-900/40 backdrop-blur-sm border border-neutral-700/50 rounded-xl'
							variants={itemVariants}
							transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
							whileHover={{ scale: 1.02, y: -2 }}
						>
							<h3 className='text-xl font-semibold mb-3 text-neutral-200'>Full Stack Development</h3>
							<p className='text-sm text-neutral-400 leading-relaxed'>
								Backend development with Node.js, type-safe APIs using tRPC, and database management with Drizzle ORM. Leveraging Supabase for backend services and real-time features.
							</p>
						</motion.div>

						<motion.div
							className='p-6 bg-neutral-900/40 backdrop-blur-sm border border-neutral-700/50 rounded-xl md:col-span-2'
							variants={itemVariants}
							transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
							whileHover={{ scale: 1.02, y: -2 }}
						>
							<h3 className='text-xl font-semibold mb-3 text-neutral-200'>Development Workflow</h3>
							<p className='text-sm text-neutral-400 leading-relaxed'>
								Using Git for version control, deploying on Vercel for seamless CI/CD, and building with solid foundations in HTML and CSS. Always exploring new tools and technologies to improve the
								development experience and code quality.
							</p>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	);
}
