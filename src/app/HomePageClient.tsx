"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { siteContent } from "@/lib/content";

const { projects, contacts } = siteContent;

function stagger(i: number) {
	return { duration: 0.6, ease: "easeOut" as const, delay: i * 0.12 };
}

function GithubIcon({
	size = 16,
	className,
}: {
	size?: number;
	className?: string;
	strokeWidth?: number;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-label="GitHub"
		>
			<path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
		</svg>
	);
}

const iconMap: Record<
	string,
	React.ComponentType<{
		size?: number;
		className?: string;
		strokeWidth?: number;
	}>
> = {
	github: GithubIcon,
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
