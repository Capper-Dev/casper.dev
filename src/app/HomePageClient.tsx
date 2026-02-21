"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { TerminalHome } from "@/components/designs/terminal/TerminalHome";
import { PageTransition } from "@/components/layout/PageTransition";
import { CyclingText } from "@/components/ui/CyclingText";
import { LocalTime } from "@/components/ui/LocalTime";
import { useDesign } from "@/lib/design-context";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

function GlassHome() {
	return (
		<PageTransition>
			<div className="!overflow-hidden relative flex h-screen items-center justify-center px-6">
				<motion.div
					className="w-full max-w-2xl space-y-8 text-center"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div
						className="space-y-6"
						variants={itemVariants}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<motion.h1
							className="bg-gradient-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text font-bold text-6xl text-transparent tracking-tight md:text-8xl"
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
						>
							Casper
						</motion.h1>

						<div className="flex w-full justify-center">
							<CyclingText />
						</div>

						<motion.div
							className="flex w-full items-center justify-center gap-4 text-sm"
							variants={itemVariants}
							transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
						>
							<div className="flex w-32 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/30 px-4 py-2 backdrop-blur-sm">
								<MapPin
									className="h-4 w-4 text-neutral-400"
									strokeWidth={1.5}
								/>
								<span className="text-neutral-300">Denmark</span>
							</div>
							<LocalTime />
						</motion.div>

						<motion.p
							className="mx-auto max-w-lg text-lg text-neutral-400 leading-relaxed"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
						>
							Hi, I&apos;m a self-taught hobby programmer who loves building
							modern web applications with React, TypeScript, and Next.js.
							Welcome to my little corner of the internet.
						</motion.p>
					</motion.div>

					<motion.div
						className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
						variants={itemVariants}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
					>
						<motion.div
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							className="w-full sm:w-auto"
						>
							<Link
								href="/projects"
								className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white to-neutral-200 px-6 py-3 font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-white/10 sm:w-48"
							>
								View Projects
								<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
							</Link>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							className="w-full sm:w-auto"
						>
							<Link
								href="/contact"
								className="inline-block w-full rounded-lg border border-neutral-700 px-6 py-3 text-center font-medium text-neutral-200 backdrop-blur-sm transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-900 hover:text-white sm:w-48"
							>
								Get In Touch
							</Link>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	);
}

export default function HomePage() {
	const { design } = useDesign();
	if (design === "terminal") return <TerminalHome />;
	return <GlassHome />;
}
