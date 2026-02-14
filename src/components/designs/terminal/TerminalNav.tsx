"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routeLabels: Record<string, string> = {
	"/": "~",
	"/about": "~/about",
	"/experience": "~/experience",
	"/projects": "~/projects",
	"/contact": "~/contact",
};

const navLinks = [
	{ href: "/", label: "home" },
	{ href: "/about", label: "about" },
	{ href: "/experience", label: "exp" },
	{ href: "/projects", label: "projects" },
	{ href: "/contact", label: "contact" },
];

export function TerminalNav() {
	const pathname = usePathname();
	const cwd = routeLabels[pathname] || "~";

	return (
		<motion.nav
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="fixed top-0 right-0 left-0 z-40 border-emerald-900/50 border-b bg-black/90 backdrop-blur-sm"
		>
			<div className="flex items-center gap-4 px-4 py-3 font-mono text-sm">
				<span className="text-emerald-600">casper@portfolio</span>
				<span className="text-neutral-600">:</span>
				<span className="text-blue-400">{cwd}</span>
				<span className="text-neutral-600">$</span>

				<div className="flex gap-3">
					{navLinks.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href}
								className={`transition-colors ${
									isActive
										? "text-emerald-300 underline underline-offset-4"
										: "text-emerald-700 hover:text-emerald-400"
								}`}
							>
								{link.label}
							</Link>
						);
					})}
				</div>

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
		</motion.nav>
	);
}
