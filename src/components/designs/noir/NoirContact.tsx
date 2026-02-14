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

export function NoirContact() {
	return (
		<NoirPageTransition>
			<div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
				<div className="space-y-8">
					<FadeIn delay={0.1}>
						<div className="flex items-end justify-between border-stone-800/50 border-b pb-4">
							<div>
								<p className="font-mono text-red-800/60 text-xs uppercase tracking-[0.3em]">
									Case File No. 005
								</p>
								<h1 className="mt-1 font-bold font-serif text-4xl text-stone-100">
									Contact Intelligence
								</h1>
							</div>
							<span className="noir-stamp text-red-700/50 text-xs">Open</span>
						</div>
					</FadeIn>

					<FadeIn delay={0.2}>
						<p className="text-stone-500">
							Secure communication channels for the subject. Approach with
							caution - or a good project idea.
						</p>
					</FadeIn>

					<div className="space-y-3">
						{siteContent.contacts.map((contact, i) => (
							<FadeIn key={contact.label} delay={0.3 + i * 0.12}>
								<motion.a
									href={contact.href}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ x: 4 }}
									className="group flex items-center border border-stone-800/30 bg-stone-900/20 transition-all hover:border-red-900/30 hover:bg-stone-900/40"
								>
									<div className="flex h-full w-16 flex-shrink-0 items-center justify-center border-stone-800/30 border-r bg-stone-900/30 py-4 font-mono text-red-800/50 text-xs">
										CH-{String(i + 1).padStart(2, "0")}
									</div>

									<div className="flex flex-1 items-center justify-between px-5 py-4">
										<div>
											<span className="font-mono text-stone-400 text-xs uppercase tracking-wider">
												{contact.label}
											</span>
											<p className="mt-0.5 text-sm text-stone-500 transition-colors group-hover:text-stone-300">
												{contact.value}
											</p>
										</div>
										<span className="font-mono text-stone-700 text-xs transition-colors group-hover:text-red-800/60">
											CONNECT &rarr;
										</span>
									</div>
								</motion.a>
							</FadeIn>
						))}
					</div>

					<FadeIn delay={0.7}>
						<div className="noir-coffee-ring border border-stone-800/30 bg-stone-900/20 p-5">
							<div className="mb-2 flex items-center gap-3">
								<span className="font-mono text-red-800/50 text-xs">MEMO</span>
								<span className="font-mono text-stone-500 text-xs uppercase tracking-wider">
									{siteContent.contactNote.title}
								</span>
							</div>
							<p className="text-sm text-stone-500 leading-relaxed">
								{siteContent.contactNote.text}
							</p>
						</div>
					</FadeIn>

					<FadeIn delay={0.9}>
						<div className="space-y-4 pt-4 text-center">
							<div className="mx-auto h-px w-16 bg-red-900/30" />
							<p className="font-mono text-stone-700 text-xs tracking-wider">
								THIS DOCUMENT WILL SELF-DESTRUCT
							</p>
							<p className="font-mono text-stone-800 text-xs">
								(...just kidding. Or am I?)
							</p>
						</div>
					</FadeIn>
				</div>
			</div>
		</NoirPageTransition>
	);
}
