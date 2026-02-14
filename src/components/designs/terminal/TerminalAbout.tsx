"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/lib/content";
import { TerminalPageTransition } from "./TerminalPageTransition";

function Line({
	children,
	delay = 0,
}: {
	children: React.ReactNode;
	delay?: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, x: -10 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3, delay }}
		>
			{children}
		</motion.div>
	);
}

export function TerminalAbout() {
	return (
		<TerminalPageTransition>
			<div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
				<div className="space-y-4 font-mono text-sm leading-relaxed">
					<Line delay={0.1}>
						<span className="text-emerald-600">$</span>{" "}
						<span className="text-white">cat about.txt</span>
					</Line>

					<Line delay={0.3}>
						<h1 className="text-emerald-300 text-lg">
							# {siteContent.about.heading}
						</h1>
					</Line>

					<Line delay={0.4}>
						<p className="text-neutral-500">{siteContent.about.subtitle}</p>
					</Line>

					{siteContent.about.cards.map((card, i) => (
						<Line key={card.title} delay={0.5 + i * 0.2}>
							<div className="border-emerald-900/50 border-l-2 pl-4">
								<span className="text-emerald-400">## {card.title}</span>
								<p className="mt-1 text-neutral-300">{card.text}</p>
							</div>
						</Line>
					))}

					<Line delay={1.2}>
						<span className="text-emerald-600">$</span>{" "}
						<span className="text-white">
							echo $TECH_STACK | tr &apos;,&apos; &apos;\n&apos;
						</span>
					</Line>

					<Line delay={1.4}>
						<div className="flex flex-wrap gap-2 pl-2">
							{siteContent.technologies.map((tech) => (
								<span
									key={tech.name}
									className="rounded border border-emerald-900/50 bg-emerald-950/30 px-2 py-0.5 text-emerald-300 text-xs"
								>
									{tech.name}
								</span>
							))}
						</div>
					</Line>
				</div>
			</div>
		</TerminalPageTransition>
	);
}
