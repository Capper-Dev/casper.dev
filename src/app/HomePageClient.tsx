'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { CyclingText } from '@/components/ui/CyclingText';
import { LocalTime } from '@/components/ui/LocalTime';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
	return (
		<PageTransition>
			<div className='h-screen flex items-center justify-center px-6'>
				<motion.div className='max-w-2xl text-center space-y-8 w-full' variants={containerVariants} initial='hidden' animate='visible'>
					<motion.div className='space-y-6' variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut' }}>
						<motion.h1
							className='text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent'
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
						>
							Casper
						</motion.h1>

						<div className='flex justify-center w-full'>
							<CyclingText />
						</div>

						<motion.div className='flex items-center justify-center gap-4 text-sm w-full' variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
							<div className='flex items-center justify-center gap-2 w-32 px-4 py-2 bg-neutral-900/30 border border-neutral-800 rounded-full backdrop-blur-sm'>
								<MapPin className='w-4 h-4 text-neutral-400' strokeWidth={1.5} />
								<span className='text-neutral-300'>Denmark</span>
							</div>
							<LocalTime />
						</motion.div>

						<motion.p
							className='text-lg text-neutral-400 max-w-lg mx-auto leading-relaxed'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
						>
							Hi, I&apos;m a self-taught hobby programmer who loves building modern web applications with React, TypeScript, and Next.js. Welcome to my little corner of the internet.
						</motion.p>
					</motion.div>

					<motion.div className='flex flex-col sm:flex-row gap-4 justify-center items-center w-full' variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}>
						<motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className='w-full sm:w-auto'>
							<Link
								href='/projects'
								className='group w-full sm:w-48 px-6 py-3 bg-gradient-to-r from-white to-neutral-200 text-black rounded-lg font-medium hover:shadow-lg hover:shadow-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2'
							>
								View Projects
								<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
							</Link>
						</motion.div>

						<motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className='w-full sm:w-auto'>
							<Link
								href='/contact'
								className='w-full sm:w-48 px-6 py-3 border border-neutral-700 rounded-lg font-medium hover:bg-neutral-900 hover:border-neutral-600 transition-all duration-300 backdrop-blur-sm text-center inline-block text-neutral-200 hover:text-white'
							>
								Get In Touch
							</Link>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	);
}
