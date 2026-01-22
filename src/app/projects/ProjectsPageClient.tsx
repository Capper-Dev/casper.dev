"use client";

import { motion } from "framer-motion";
import { Github, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";

const projects = [
	{
		title: "Portfolio Website",
		description:
			"This very website! Built with Next.js 15 and modern animations.",
		tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
		github: "https://github.com/Capper-Dev/casper.dev",
		image: "/images/portfolio.webp",
		isPrivate: false,
	},
	{
		title: "Odessa Website",
		description:
			"A website for a FiveM server, built with Next.js and tRPC. Private repo, due to made for customer.",
		tech: ["Next.js", "TypeScript", "tRPC", "Supabase", "Tailwind"],
		github: "https://github.com/Capper-Dev",
		image: "/images/odwebsite.webp",
		demo: "https://odessarp.com",
		isPrivate: true,
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

function ProjectImage({
	project,
}: {
	project: { title: string; image?: string; demo?: string };
}) {
	const [imageError, setImageError] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	if (!project.image || imageError) {
		return (
			<div className="flex h-full items-center justify-center">
				<Smartphone
					className="h-8 w-8 text-neutral-500 transition-colors group-hover:text-neutral-400"
					strokeWidth={1.5}
				/>
			</div>
		);
	}

	return (
		<div className="relative h-full w-full overflow-hidden">
			{!imageLoaded && (
				<div className="absolute inset-0 flex items-center justify-center bg-neutral-800/50">
					<div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent"></div>
				</div>
			)}

			<Image
				src={project.image}
				alt={`${project.title} preview`}
				fill={true}
				className={`transition-all duration-300 hover:scale-105${imageLoaded ? "opacity-100" : "opacity-0"}
				`}
				style={{
					objectFit: "cover",
					objectPosition: "center",
				}}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
				quality={80}
				priority={true}
				onLoad={() => setImageLoaded(true)}
				onError={() => setImageError(true)}
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent transition-all duration-300 hover:from-neutral-900/20" />
		</div>
	);
}

export default function ProjectsPage() {
	return (
		<PageTransition>
			<div className="mx-auto flex h-screen max-w-5xl flex-col justify-center overflow-hidden px-6">
				<motion.div
					className="space-y-6"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div
						className="space-y-2 text-center"
						variants={itemVariants}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<h1 className="bg-gradient-to-r from-white to-neutral-300 bg-clip-text font-bold text-3xl text-transparent">
							Projects
						</h1>
						<p className="text-neutral-400">
							A few things I&apos;ve built while learning and experimenting
						</p>
					</motion.div>

					<motion.div className="space-y-6" variants={containerVariants}>
						{projects.map((project, index) => (
							<motion.div
								key={project.title}
								variants={itemVariants}
								transition={{
									duration: 0.6,
									ease: "easeOut",
									delay: index * 0.1,
								}}
								className="group relative h-48 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30 transition-all duration-300 hover:border-neutral-700"
							>
								<div className="absolute inset-0 bg-gradient-to-r from-white/5 to-neutral-300/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

								{!project.isPrivate && (
									<div className="absolute top-3 right-3 z-20">
										<Link
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											aria-label="View GitHub repository"
										>
											<Github className="h-4 w-4 text-neutral-400 transition-colors hover:text-white" />
										</Link>
									</div>
								)}

								<div className="relative z-10 grid h-full grid-cols-2">
									<div className="flex flex-col justify-between p-4">
										<div className="space-y-2">
											<h3 className="font-semibold text-lg text-white">
												{project.title}
											</h3>
											<p className="line-clamp-2 text-neutral-400 text-sm leading-relaxed">
												{project.description}
											</p>
										</div>

										<div className="space-y-2">
											<div className="flex flex-wrap gap-1">
												{project.tech.slice(0, 5).map((tech) => (
													<span
														key={tech}
														className="rounded-full bg-neutral-800 px-2 py-1 text-neutral-300 text-xs"
													>
														{tech}
													</span>
												))}
											</div>
										</div>
									</div>

									{project.demo ? (
										<Link
											href={project.demo}
											target="_blank"
											rel="noopener noreferrer"
											className="relative flex cursor-pointer items-center justify-center border-neutral-700/50 border-l bg-neutral-800/50 transition-colors hover:border-neutral-600/50"
										>
											<ProjectImage project={project} />
										</Link>
									) : (
										<div className="relative flex items-center justify-center border-neutral-700/50 border-l bg-neutral-800/50 transition-colors">
											<ProjectImage project={project} />
										</div>
									)}
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	);
}
