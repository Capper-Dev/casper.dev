"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import Link from "next/link";
import { siteContent } from "@/lib/content";

const { projects, contacts } = siteContent;

function stagger(i: number) {
	return { duration: 0.6, ease: "easeOut" as const, delay: i * 0.12 };
}

const iconMap: Record<string, typeof Github> = {
	github: Github,
	email: Mail,
};

export default function HomePageClient() {
	return (
		<div className="flex min-h-screen items-center justify-center px-6">
			<div className="w-full max-w-md">
				<motion.header
					className="mb-14"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={stagger(0)}
				>
					<h1 className="font-bold text-5xl tracking-tight md:text-6xl">
						casper
					</h1>
					<p className="mt-3 text-neutral-500">
						developer &amp; designer from denmark
					</p>
					<div className="mt-5 flex gap-5">
						{contacts.map((c) => {
							const Icon = iconMap[c.type] || ArrowUpRight;
							return (
								<Link
									key={c.label}
									href={c.href}
									target={c.type === "email" ? undefined : "_blank"}
									rel={c.type === "email" ? undefined : "noopener noreferrer"}
									className="text-neutral-600 transition-colors duration-200 hover:text-white"
								>
									<Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
								</Link>
							);
						})}
					</div>
				</motion.header>

				<motion.section
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={stagger(2)}
				>
					{projects.map((project, i) => {
						return (
							<motion.div
								key={project.title}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={stagger(i + 3)}
							>
								<Link
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 py-3 text-neutral-500 transition-colors duration-200 hover:text-white"
								>
									{project.title}
									<ArrowUpRight
										className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
										strokeWidth={2}
									/>
								</Link>
							</motion.div>
						);
					})}
				</motion.section>
			</div>
		</div>
	);
}
