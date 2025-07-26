'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Logo() {
	return (
		<Link href='/' className='flex items-center gap-2 group'>
			<motion.div
				className='w-8 h-8 bg-gradient-to-br from-white to-neutral-400 rounded-sm flex items-center justify-center'
				whileHover={{ scale: 1.1, rotate: 5 }}
				transition={{ type: 'spring', stiffness: 400, damping: 10 }}
			>
				<span className='text-black font-bold text-sm'>C</span>
			</motion.div>
			<span className='font-mono text-sm text-neutral-400 group-hover:text-white transition-colors duration-300'>casper.dev</span>
		</Link>
	);
}
