"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

export function NoirAbout() {
	return (
		<NoirPageTransition>
			<div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-20">
				<div className="space-y-8">
					<FadeIn delay={0.1}>
						<div className="flex items-end justify-between border-stone-800/50 border-b pb-4">
							<div>
								<p className="font-mono text-red-800/60 text-xs uppercase tracking-[0.3em]">
									Case File No. 002
								</p>
								<h1 className="mt-1 font-bold font-serif text-4xl text-stone-100">
									Subject Profile
								</h1>
							</div>
							<span className="noir-stamp text-red-700/50 text-xs">Active</span>
						</div>
					</FadeIn>

					{siteContent.about.cards.map((card, i) => (
						<FadeIn key={card.title} delay={0.2 + i * 0.15}>
							<div className="noir-tape border border-stone-800/30 bg-stone-900/30 p-5">
								<div className="mb-3 flex items-center gap-3">
									<span className="font-mono text-red-800/50 text-xs">
										NOTE-{String(i + 1).padStart(3, "0")}
									</span>
									<span className="font-mono text-stone-500 text-xs uppercase tracking-wider">
										{card.title}
									</span>
								</div>
								<p className="text-stone-400 leading-relaxed">{card.text}</p>
							</div>
						</FadeIn>
					))}

					<FadeIn delay={0.7}>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<p className="font-mono text-stone-600 text-xs uppercase tracking-wider">
									Known Associations
								</p>
								<div className="h-px flex-1 bg-stone-800/50" />
							</div>

							<div className="grid grid-cols-3 gap-2 md:grid-cols-6">
								{siteContent.technologies.map((tech) => (
									<motion.div
										key={tech.name}
										whileHover={{
											scale: 1.05,
											borderColor: "rgba(127,29,29,0.3)",
										}}
										className="flex flex-col items-center gap-2 border border-stone-800/30 bg-stone-900/20 p-3 text-center transition-colors"
									>
										<Image
											src={tech.icon}
											alt={tech.name}
											width={28}
											height={28}
											loading="eager"
											className="object-contain opacity-60 grayscale"
										/>
										<span className="font-mono text-stone-500 text-xs">
											{tech.name}
										</span>
									</motion.div>
								))}
							</div>
						</div>
					</FadeIn>

					<FadeIn delay={0.9}>
						<p className="pt-4 text-center font-mono text-stone-700 text-xs tracking-wider">
							END OF FILE - CF-002
						</p>
					</FadeIn>
				</div>
			</div>
		</NoirPageTransition>
	);
}
