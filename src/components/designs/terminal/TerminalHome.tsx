"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteContent } from "@/lib/content";
import { TerminalPageTransition } from "./TerminalPageTransition";

function TypewriterLine({
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

export function TerminalHome() {
	return (
		<TerminalPageTransition>
			<div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
				<div className="space-y-4 font-mono text-sm leading-relaxed">
					<TypewriterLine delay={0.1}>
						<span className="text-emerald-600">$</span>{" "}
						<span className="text-white">cat welcome.txt</span>
					</TypewriterLine>

					<TypewriterLine delay={0.3}>
						<pre className="text-emerald-400">
							{`
  ██████╗ █████╗ ███████╗██████╗ ███████╗██████╗
 ██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗
 ██║     ███████║███████╗██████╔╝█████╗  ██████╔╝
 ██║     ██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗
 ╚██████╗██║  ██║███████║██║     ███████╗██║  ██║
  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝`}
						</pre>
					</TypewriterLine>

					<TypewriterLine delay={0.6}>
						<span className="text-neutral-500">---</span>
					</TypewriterLine>

					<TypewriterLine delay={0.8}>
						<span className="text-emerald-300">&gt;</span>{" "}
						<span className="text-neutral-300">{siteContent.bio}</span>
					</TypewriterLine>

					<TypewriterLine delay={1.0}>
						<span className="text-neutral-500">---</span>
					</TypewriterLine>

					<TypewriterLine delay={1.2}>
						<span className="text-emerald-600">$</span>{" "}
						<span className="text-white">ls -la pages/</span>
					</TypewriterLine>

					<TypewriterLine delay={1.4}>
						<div className="space-y-1 pl-2">
							<span className="text-neutral-500">drwxr-xr-x</span>{" "}
							<Link
								href="/about"
								className="text-blue-400 underline-offset-4 hover:underline"
							>
								about/
							</Link>
						</div>
					</TypewriterLine>

					<TypewriterLine delay={1.5}>
						<div className="pl-2">
							<span className="text-neutral-500">drwxr-xr-x</span>{" "}
							<Link
								href="/experience"
								className="text-blue-400 underline-offset-4 hover:underline"
							>
								experience/
							</Link>
						</div>
					</TypewriterLine>

					<TypewriterLine delay={1.6}>
						<div className="pl-2">
							<span className="text-neutral-500">drwxr-xr-x</span>{" "}
							<Link
								href="/projects"
								className="text-blue-400 underline-offset-4 hover:underline"
							>
								projects/
							</Link>
						</div>
					</TypewriterLine>

					<TypewriterLine delay={1.7}>
						<div className="pl-2">
							<span className="text-neutral-500">drwxr-xr-x</span>{" "}
							<Link
								href="/contact"
								className="text-blue-400 underline-offset-4 hover:underline"
							>
								contact/
							</Link>
						</div>
					</TypewriterLine>

					<TypewriterLine delay={2.0}>
						<div className="flex items-center gap-1">
							<span className="text-emerald-600">$</span>{" "}
							<motion.span
								animate={{ opacity: [1, 0] }}
								transition={{
									duration: 0.8,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "reverse",
								}}
								className="text-emerald-400"
							>
								_
							</motion.span>
						</div>
					</TypewriterLine>
				</div>
			</div>
		</TerminalPageTransition>
	);
}
