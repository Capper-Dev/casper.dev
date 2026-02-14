"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { siteContent } from "@/lib/content";
import { NoirPageTransition } from "./NoirPageTransition";

function FadeIn({
	children,
	delay = 0,
	className = "",
}: {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7, delay, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

function EvidencePhoto({
	project,
}: {
	project: (typeof siteContent.projects)[number];
}) {
	const [error, setError] = useState(false);

	if (!project.image || error) {
		return (
			<div className="flex h-full items-center justify-center bg-stone-900 font-mono text-stone-700 text-xs">
				[NO PHOTO]
			</div>
		);
	}

	return (
		<Image
			src={project.image}
			alt={project.title}
			width={800}
			height={400}
			className="h-full w-full object-cover opacity-70 grayscale transition-all duration-500 hover:opacity-90 hover:grayscale-0"
			onError={() => setError(true)}
		/>
	);
}

export function NoirProjects() {
	return (
		<NoirPageTransition>
			<div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-20">
				<div className="space-y-8">
					<FadeIn delay={0.1}>
						<div className="flex items-end justify-between border-stone-800/50 border-b pb-4">
							<div>
								<p className="font-mono text-red-800/60 text-xs uppercase tracking-[0.3em]">
									Case File No. 004
								</p>
								<h1 className="mt-1 font-bold font-serif text-4xl text-stone-100">
									Evidence Log
								</h1>
							</div>
							<span className="font-mono text-stone-600 text-xs">
								{siteContent.projects.length} ITEMS CATALOGUED
							</span>
						</div>
					</FadeIn>

					{siteContent.projects.map((project, i) => (
						<FadeIn key={project.title} delay={0.2 + i * 0.2}>
							<motion.div
								whileHover={{ y: -2 }}
								className="noir-tape group overflow-hidden border border-stone-800/30 bg-stone-900/20"
							>
								<div className="grid md:grid-cols-5">
									<div className="relative h-48 overflow-hidden md:col-span-2 md:h-auto">
										<EvidencePhoto project={project} />
										<div className="absolute top-2 left-2">
											<span className="bg-neutral-950/80 px-2 py-0.5 font-mono text-red-800/60 text-xs">
												EX-{String(i + 1).padStart(3, "0")}
											</span>
										</div>
									</div>

									<div className="flex flex-col justify-between p-5 md:col-span-3">
										<div className="space-y-3">
											<div className="flex items-center gap-3">
												<h3 className="font-bold font-serif text-stone-200 text-xl">
													{project.title}
												</h3>
												{project.isPrivate && (
													<Lock className="h-3.5 w-3.5 text-red-800/50" />
												)}
											</div>

											<p className="text-sm text-stone-500 leading-relaxed">
												{project.description}
											</p>

											<div className="flex flex-wrap gap-1.5">
												{project.tech.map((t) => (
													<span
														key={t}
														className="border border-stone-800/30 px-2 py-0.5 font-mono text-stone-600 text-xs"
													>
														{t}
													</span>
												))}
											</div>
										</div>

										<div className="mt-4 flex items-center gap-4 border-stone-800/30 border-t pt-3">
											{!project.isPrivate && (
												<a
													href={project.github}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-1.5 font-mono text-stone-500 text-xs transition-colors hover:text-stone-300"
												>
													<span>[SOURCE]</span>
												</a>
											)}
											{project.demo && (
												<a
													href={project.demo}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-1.5 font-mono text-red-800/60 text-xs transition-colors hover:text-red-600"
												>
													<ExternalLink className="h-3 w-3" />
													<span>LIVE EXHIBIT</span>
												</a>
											)}
											{project.isPrivate && (
												<span className="noir-redacted font-mono text-stone-600 text-xs">
													Access Restricted
												</span>
											)}
										</div>
									</div>
								</div>
							</motion.div>
						</FadeIn>
					))}

					<FadeIn delay={0.7}>
						<p className="pt-4 text-center font-mono text-stone-700 text-xs tracking-wider">
							END OF FILE - CF-004
						</p>
					</FadeIn>
				</div>
			</div>
		</NoirPageTransition>
	);
}
