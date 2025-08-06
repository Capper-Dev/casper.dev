'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Mail, User, Code, House, BookOpen } from 'lucide-react';

const navItems = [
	{ name: 'Home', href: '/', icon: House },
	{ name: 'About', href: '/about', icon: User },
	{ name: 'Experience', href: '/experience', icon: Code },
	{ name: 'Projects', href: '/projects', icon: LayoutGrid },
	{ name: 'Blog', href: '/blog', icon: BookOpen },
	{ name: 'Contact', href: '/contact', icon: Mail },
];

export function Footer() {
	const pathname = usePathname();

	return (
		<motion.nav initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50'>
			<div className='flex gap-2 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50'>
				{navItems.map((item, index) => {
					const isActive = pathname === item.href || (item.href === '/blog' && pathname.startsWith('/blog'));
					const Icon = item.icon;

					return (
						<motion.div key={item.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}>
							<Link
								href={item.href}
								className={`relative flex flex-col items-center justify-center gap-1 w-20 h-16 rounded-xl transition-all duration-300 group ${
									isActive ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-neutral-400 hover:text-white hover:bg-white/10'
								}`}
							>
								{isActive && <motion.div layoutId='activeTab' className='absolute inset-0 bg-white rounded-xl' initial={false} transition={{ duration: 0.3, ease: 'easeInOut' }} />}

								<motion.div className='relative z-10' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
									<Icon className={`w-5 h-5 ${isActive ? 'text-black' : ''}`} strokeWidth={2} />
								</motion.div>

								<span className={`text-xs font-medium relative z-10 ${isActive ? 'text-black' : ''}`}>{item.name}</span>

								{!isActive && <motion.div className='absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100' transition={{ duration: 0.2 }} />}
							</Link>
						</motion.div>
					);
				})}
			</div>
		</motion.nav>
	);
}
