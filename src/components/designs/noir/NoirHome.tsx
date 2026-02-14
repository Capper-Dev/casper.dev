"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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

export function NoirHome() {
	return (
		<NoirPageTransition>
			<div className="flex min-h-screen items-center justify-center px-6 py-20">
				<div className="w-full max-w-2xl space-y-12">
					<FadeIn delay={0.1}>
						<div className="space-y-6 text-center">
							<div className="flex justify-center">
								<span className="noir-stamp text-red-700/70 text-xs">
									Classified
								</span>
							</div>

							<div className="space-y-2">
								<p className="font-mono text-stone-600 text-xs uppercase tracking-[0.3em]">
									Case File No. 001 - Subject Identification
								</p>
								<h1 className="font-bold font-serif text-6xl text-stone-100 tracking-tight md:text-8xl">
									{siteContent.name}
								</h1>
								<div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />
							</div>
						</div>
					</FadeIn>

					<FadeIn delay={0.4}>
						<div className="noir-tape noir-coffee-ring rounded border border-stone-800/50 bg-stone-900/40 p-6">
							<p className="font-mono text-red-800/60 text-xs uppercase tracking-wider">
								Field Notes
							</p>
							<p className="mt-3 text-stone-400 leading-relaxed">
								{siteContent.bio}
							</p>
							<div className="mt-4 flex items-center gap-4 font-mono text-stone-600 text-xs">
								<span>LOC: {siteContent.location}</span>
								<span className="text-red-900/40">|</span>
								<span>STATUS: Active</span>
								<span className="text-red-900/40">|</span>
								<span>
									THREAT:{" "}
									<span className="noir-redacted text-stone-600">None</span>
								</span>
							</div>
						</div>
					</FadeIn>

					<FadeIn delay={0.7}>
						<div className="space-y-3">
							<p className="font-mono text-stone-600 text-xs uppercase tracking-wider">
								Case Index
							</p>
							<div className="grid grid-cols-2 gap-2">
								{[
									{
										href: "/about",
										code: "CF-002",
										label: "Subject Profile",
									},
									{
										href: "/experience",
										code: "CF-003",
										label: "Known Skills",
									},
									{
										href: "/projects",
										code: "CF-004",
										label: "Evidence Log",
									},
									{
										href: "/contact",
										code: "CF-005",
										label: "Contact Intel",
									},
								].map((item) => (
									<motion.div
										key={item.href}
										whileHover={{ x: 4 }}
										transition={{ duration: 0.2 }}
									>
										<Link
											href={item.href}
											className="group flex items-center gap-3 border border-stone-800/30 bg-stone-900/20 px-4 py-3 transition-all hover:border-red-900/30 hover:bg-stone-900/40"
										>
											<span className="font-mono text-red-800/50 text-xs">
												{item.code}
											</span>
											<span className="text-sm text-stone-400 transition-colors group-hover:text-stone-200">
												{item.label}
											</span>
											<span className="ml-auto font-mono text-stone-700 text-xs transition-colors group-hover:text-red-800/60">
												&rarr;
											</span>
										</Link>
									</motion.div>
								))}
							</div>
						</div>
					</FadeIn>

					<FadeIn delay={1.0}>
						<div className="pt-4 text-center">
							<p className="font-mono text-stone-700 text-xs tracking-wider">
								EYES ONLY - DO NOT DISTRIBUTE
							</p>
						</div>
					</FadeIn>
				</div>
			</div>
		</NoirPageTransition>
	);
}
