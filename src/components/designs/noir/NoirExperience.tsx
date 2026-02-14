"use client";

import { motion } from "framer-motion";
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

export function NoirExperience() {
	return (
		<NoirPageTransition>
			<div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-20">
				<div className="space-y-8">
					<FadeIn delay={0.1}>
						<div className="flex items-end justify-between border-stone-800/50 border-b pb-4">
							<div>
								<p className="font-mono text-red-800/60 text-xs uppercase tracking-[0.3em]">
									Case File No. 003
								</p>
								<h1 className="mt-1 font-bold font-serif text-4xl text-stone-100">
									Known Capabilities
								</h1>
							</div>
							<span className="noir-stamp text-red-700/50 text-xs">
								Verified
							</span>
						</div>
					</FadeIn>

					<FadeIn delay={0.2}>
						<p className="text-stone-500">{siteContent.experience.subtitle}</p>
					</FadeIn>

					<div className="relative space-y-6">
						<div className="absolute top-0 bottom-0 left-3 w-px bg-gradient-to-b from-red-900/40 via-red-900/20 to-transparent" />

						{siteContent.experience.areas.map((area, i) => (
							<FadeIn key={area.title} delay={0.3 + i * 0.15}>
								<div className="relative pl-10">
									<div className="absolute top-2 left-1 h-5 w-5 rounded-full border-2 border-red-900/40 bg-neutral-950" />

									<div className="noir-tape border border-stone-800/30 bg-stone-900/30 p-5">
										<div className="mb-2 flex items-center gap-3">
											<span className="font-mono text-red-800/50 text-xs">
												RPT-{String(i + 1).padStart(3, "0")}
											</span>
											<span className="font-mono text-stone-400 text-xs uppercase tracking-wider">
												{area.title}
											</span>
										</div>
										<p className="text-sm text-stone-500 leading-relaxed">
											{area.text}
										</p>
									</div>
								</div>
							</FadeIn>
						))}
					</div>

					<FadeIn delay={0.8}>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<p className="font-mono text-stone-600 text-xs uppercase tracking-wider">
									Intercepted Tool Registry
								</p>
								<div className="h-px flex-1 bg-stone-800/50" />
							</div>

							<div className="flex flex-wrap gap-2">
								{siteContent.skills.map((skill, i) => (
									<motion.span
										key={skill.name}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											delay: 0.9 + i * 0.04,
										}}
										className="border border-stone-800/40 bg-stone-900/20 px-3 py-1 font-mono text-stone-500 text-xs transition-colors hover:border-red-900/30 hover:text-stone-300"
									>
										{skill.name}
									</motion.span>
								))}
							</div>
						</div>
					</FadeIn>

					<FadeIn delay={1.1}>
						<p className="pt-4 text-center font-mono text-stone-700 text-xs tracking-wider">
							END OF FILE - CF-003
						</p>
					</FadeIn>
				</div>
			</div>
		</NoirPageTransition>
	);
}
