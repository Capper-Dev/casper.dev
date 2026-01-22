"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type ComponentType, useEffect, useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { DrizzleIcon } from "@/components/ui/Icons";

interface IconComponentProps {
	className?: string;
}

interface SkillTypes {
	name: string;
	icon: string;
	component?: ComponentType<IconComponentProps>;
}

const skills: SkillTypes[] = [
	{
		name: "React",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
	},
	{
		name: "TypeScript",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
	},
	{
		name: "Next.js",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
	},
	{
		name: "Tailwind CSS",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
	},
	{
		name: "tRPC",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trpc/trpc-original.svg",
	},
	{ name: "Drizzle", icon: "custom", component: DrizzleIcon },
	{
		name: "Supabase",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
	},
	{
		name: "Node.js",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
	},
	{
		name: "Git",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
	},
	{
		name: "Vercel",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
	},
	{
		name: "CSS",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
	},
	{
		name: "HTML",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
	},
];

const FloatingSkill = ({ skill }: { skill: SkillTypes; index: number }) => {
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
		if (skill.icon === "custom" && skill.component) {
			const IconComponent = skill.component;
			return <IconComponent className="h-full w-full brightness-75 filter" />;
		} else {
			return (
				<Image
					src={skill.icon}
					alt={skill.name}
					width={32}
					height={32}
					className="object-contain brightness-75 filter"
				/>
			);
		}
	};

	return (
		<motion.div
			className="pointer-events-none fixed z-0"
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
					ease: "easeInOut",
				},
				y: {
					delay: randomDelay,
					duration: randomDuration + 3,
					repeat: Infinity,
					ease: "easeInOut",
				},
			}}
		>
			<div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-800/30 bg-neutral-900/20 p-2 backdrop-blur-sm">
				{renderIcon()}
			</div>
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

			<div className="relative z-10 mx-auto flex h-screen max-w-3xl flex-col justify-center overflow-hidden px-6">
				<motion.div
					className="space-y-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div
						className="space-y-4 text-center"
						variants={itemVariants}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<h1 className="bg-gradient-to-r from-white to-neutral-300 bg-clip-text font-bold text-4xl text-transparent md:text-5xl">
							Experience
						</h1>
						<p className="text-lg text-neutral-400">
							My self-taught journey through modern web development
						</p>
					</motion.div>

					<motion.div
						className="grid gap-6 md:grid-cols-2"
						variants={containerVariants}
					>
						<motion.div
							className="rounded-xl border border-neutral-700/50 bg-neutral-900/40 p-6 backdrop-blur-sm transition-colors hover:border-neutral-600"
							variants={itemVariants}
							transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
						>
							<h3 className="mb-3 font-semibold text-neutral-200 text-xl">
								Frontend & Design
							</h3>
							<p className="text-neutral-400 text-sm leading-relaxed">
								Building modern interfaces with React, TypeScript, and Next.js.
								Using Tailwind CSS for rapid styling and Lucide/Phosphor icons
								for clean iconography. Explored Mantine for component libraries.
							</p>
						</motion.div>

						<motion.div
							className="rounded-xl border border-neutral-700/50 bg-neutral-900/40 p-6 backdrop-blur-sm transition-colors hover:border-neutral-600"
							variants={itemVariants}
							transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
						>
							<h3 className="mb-3 font-semibold text-neutral-200 text-xl">
								Full Stack Development
							</h3>
							<p className="text-neutral-400 text-sm leading-relaxed">
								Backend development with Node.js, type-safe APIs using tRPC, and
								database management with Drizzle ORM. Leveraging Supabase for
								backend services and real-time features.
							</p>
						</motion.div>

						<motion.div
							className="rounded-xl border border-neutral-700/50 bg-neutral-900/40 p-6 backdrop-blur-sm transition-colors hover:border-neutral-600 md:col-span-2"
							variants={itemVariants}
							transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
						>
							<h3 className="mb-3 font-semibold text-neutral-200 text-xl">
								Development Workflow
							</h3>
							<p className="text-neutral-400 text-sm leading-relaxed">
								Using Git for version control, deploying on Vercel for seamless
								CI/CD, and building with solid foundations in HTML and CSS.
								Always exploring new tools and technologies to improve the
								development experience and code quality.
							</p>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	);
}
