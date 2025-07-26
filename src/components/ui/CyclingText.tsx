'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const titles = ['Hobby Programmer', 'Problem Solver', 'Self Taught'];

export function CyclingText() {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % titles.length);
		}, 2500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='h-8 flex items-center justify-center w-full'>
			<AnimatePresence mode='wait'>
				<motion.span
					key={currentIndex}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className='text-neutral-400 font-mono text-sm text-center'
				>
					{titles[currentIndex]}
				</motion.span>
			</AnimatePresence>
		</div>
	);
}
