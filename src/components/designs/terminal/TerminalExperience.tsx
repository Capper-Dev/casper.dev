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

export function TerminalExperience() {
	return (
		<TerminalPageTransition>
			<div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
				<div className="space-y-4 font-mono text-sm leading-relaxed">
					<Line delay={0.1}>
						<span className="text-emerald-600">$</span>{" "}
						<span className="text-white">cat experience.log</span>
					</Line>

					<Line delay={0.3}>
						<h1 className="text-emerald-300 text-lg">
							# {siteContent.experience.heading}
						</h1>
					</Line>

					<Line delay={0.4}>
						<p className="text-neutral-500">
							{siteContent.experience.subtitle}
						</p>
					</Line>

					{siteContent.experience.areas.map((area, i) => (
						<Line key={area.title} delay={0.5 + i * 0.2}>
							<div className="border-emerald-900/50 border-l-2 pl-4">
								<span className="text-emerald-400">
									[{String(i).padStart(2, "0")}] {area.title}
								</span>
								<p className="mt-1 text-neutral-300">{area.text}</p>
							</div>
						</Line>
					))}

					<Line delay={1.2}>
						<span className="text-emerald-600">$</span>{" "}
						<span className="text-white">ls skills/</span>
					</Line>

					<Line delay={1.4}>
						<div className="grid grid-cols-3 gap-1 pl-2 sm:grid-cols-4">
							{siteContent.skills.map((skill) => (
								<span key={skill.name} className="text-emerald-300/70">
									{skill.name.toLowerCase().replace(/[\s.]/g, "-")}
								</span>
							))}
						</div>
					</Line>
				</div>
			</div>
		</TerminalPageTransition>
	);
}
