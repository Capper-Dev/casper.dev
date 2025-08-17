'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='h-screen flex items-center justify-center px-6'>
			<motion.div className='text-center space-y-6' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
				<motion.h1 className='text-8xl font-bold text-neutral-600' initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
					404
				</motion.h1>

				<div className='space-y-4'>
					<h2 className='text-2xl font-semibold text-white'>Page Not Found</h2>
					<p className='text-neutral-400 max-w-md mx-auto'>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
				</div>

				<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
					<Link href='/' className='inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors'>
						<Home className='w-4 h-4' />
						Go Home
					</Link>

					<button
						onClick={() => window.history.back()}
						className='inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 rounded-lg font-medium hover:bg-neutral-900 transition-colors text-neutral-200'
					>
						<ArrowLeft className='w-4 h-4' />
						Go Back
					</button>
				</div>
			</motion.div>
		</div>
	);
}
