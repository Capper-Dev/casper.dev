'use client';

import { motion } from 'framer-motion';
import { Mail, Github, MessageCircle } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import Image from 'next/image';

const contacts = [
	{
		label: 'Email',
		value: 'casper.truberg@outlook.dk',
		href: 'mailto:casper.truberg@outlook.dk',
		icon: Mail,
		isCustomIcon: false,
	},
	{
		label: 'GitHub',
		value: 'github.com/Capper-Dev',
		href: 'https://github.com/Capper-Dev',
		icon: Github,
		isCustomIcon: false,
	},
	{
		label: 'Discord',
		value: 'casper.dev',
		href: 'https://discord.com/users/casper.dev',
		icon: '/discord.svg',
		isCustomIcon: true,
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

export default function ContactPage() {
	return (
		<PageTransition>
			<div className='h-screen flex flex-col justify-center max-w-2xl mx-auto px-6'>
				<motion.div className='space-y-8' variants={containerVariants} initial='hidden' animate='visible'>
					<motion.div className='space-y-2 text-center' variants={itemVariants} transition={{ duration: 0.6, ease: 'easeOut' }}>
						<h1 className='text-3xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent'>Get In Touch</h1>
						<p className='text-neutral-400'>I&apos;m always interested in new opportunities and conversations</p>
					</motion.div>

					<motion.div className='space-y-3' variants={containerVariants}>
						{contacts.map((contact, index) => (
							<motion.a
								key={contact.label}
								href={contact.href}
								target='_blank'
								rel='noopener noreferrer'
								variants={itemVariants}
								transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								className='flex items-center gap-4 p-4 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:bg-neutral-900/50 hover:border-neutral-700 transition-all duration-300 group relative overflow-hidden'
							>
								<div className='absolute inset-0 bg-gradient-to-r from-white/5 to-neutral-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

								<motion.div whileHover={{ rotate: 5, scale: 1.1 }} transition={{ duration: 0.2 }} className='relative z-10'>
									{contact.isCustomIcon ? (
										<Image src={contact.icon as string} alt={`${contact.label} icon`} width={20} height={20} className='w-5 h-5 text-neutral-400 filter brightness-0 invert opacity-60' />
									) : (
										<contact.icon className='w-5 h-5 text-neutral-400' />
									)}
								</motion.div>

								<div className='relative z-10'>
									<div className='font-medium'>{contact.label}</div>
									<div className='text-sm text-neutral-400'>{contact.value}</div>
								</div>
							</motion.a>
						))}
					</motion.div>

					<motion.div
						className='p-4 bg-gradient-to-r from-white/5 to-neutral-300/5 border border-neutral-700/50 rounded-xl relative overflow-hidden'
						variants={itemVariants}
						transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
						whileHover={{ scale: 1.02 }}
					>
						<div className='flex items-start gap-3'>
							<MessageCircle className='w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0' />
							<div>
								<h3 className='font-semibold mb-2'>Currently</h3>
								<p className='text-neutral-400 text-sm leading-relaxed'>
									Open to interesting projects, collaborations, and opportunities to learn. Whether you want to chat about code, discuss a project idea, or just say hi— I&apos;d love to hear from you!
								</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	);
}
