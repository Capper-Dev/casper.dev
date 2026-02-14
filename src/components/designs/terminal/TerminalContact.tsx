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

export function TerminalContact() {
	return (
		<TerminalPageTransition>
			<div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
				<div className="space-y-4 font-mono text-sm leading-relaxed">
					<Line delay={0.1}>
						<span className="text-emerald-600">$</span>{" "}
						<span className="text-white">cat contact.txt</span>
					</Line>

					<Line delay={0.3}>
						<h1 className="text-emerald-300 text-lg"># Get In Touch</h1>
					</Line>

					<Line delay={0.4}>
						<p className="text-neutral-500">
							I&apos;m always interested in new opportunities and conversations
						</p>
					</Line>

					<Line delay={0.6}>
						<span className="text-emerald-600">$</span>{" "}
						<span className="text-white">cat ~/.contacts</span>
					</Line>

					{siteContent.contacts.map((contact, i) => (
						<Line key={contact.label} delay={0.8 + i * 0.15}>
							<div className="flex items-center gap-3 pl-2">
								<span className="w-20 text-emerald-400">{contact.label}:</span>
								<a
									href={contact.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:underline"
								>
									{contact.value}
								</a>
							</div>
						</Line>
					))}

					<Line delay={1.4}>
						<div className="mt-4 border-emerald-900/50 border-l-2 pl-4">
							<span className="text-emerald-400">
								# {siteContent.contactNote.title}
							</span>
							<p className="mt-1 text-neutral-300">
								{siteContent.contactNote.text}
							</p>
						</div>
					</Line>
				</div>
			</div>
		</TerminalPageTransition>
	);
}
