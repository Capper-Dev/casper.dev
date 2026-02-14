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

export function TerminalProjects() {
	return (
		<TerminalPageTransition>
			<div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
				<div className="space-y-4 font-mono text-sm leading-relaxed">
					<Line delay={0.1}>
						<span className="text-emerald-600">$</span>{" "}
						<span className="text-white">ls -la projects/</span>
					</Line>

					<Line delay={0.3}>
						<p className="text-neutral-500">
							total {siteContent.projects.length}
						</p>
					</Line>

					{siteContent.projects.map((project, i) => (
						<Line key={project.title} delay={0.4 + i * 0.3}>
							<div className="rounded border border-emerald-900/30 bg-emerald-950/20 p-4">
								<div className="flex items-center gap-2">
									<span className="text-emerald-400">
										[{String(i).padStart(2, "0")}]
									</span>
									<span className="font-bold text-white">{project.title}</span>
									{project.isPrivate && (
										<span className="text-red-400/70 text-xs">[PRIVATE]</span>
									)}
								</div>

								<p className="mt-2 text-neutral-400">{project.description}</p>

								<div className="mt-2 flex flex-wrap gap-1">
									{project.tech.map((t) => (
										<span key={t} className="text-emerald-600 text-xs">
											#{t.toLowerCase().replace(/\s/g, "")}
										</span>
									))}
								</div>

								<div className="mt-2 flex gap-4 text-xs">
									{!project.isPrivate && (
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-400 hover:underline"
										>
											github
										</a>
									)}
									{project.demo && (
										<a
											href={project.demo}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-400 hover:underline"
										>
											demo
										</a>
									)}
								</div>
							</div>
						</Line>
					))}
				</div>
			</div>
		</TerminalPageTransition>
	);
}
