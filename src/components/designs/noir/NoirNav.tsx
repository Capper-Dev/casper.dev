"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ href: "/", label: "CASE FILE", code: "CF-001" },
	{ href: "/about", label: "SUBJECT", code: "CF-002" },
	{ href: "/experience", label: "DOSSIER", code: "CF-003" },
	{ href: "/projects", label: "EVIDENCE", code: "CF-004" },
	{ href: "/contact", label: "INTEL", code: "CF-005" },
];

export function NoirNav() {
	const pathname = usePathname();

	return (
		<motion.nav
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="fixed top-0 right-0 left-0 z-40 border-red-900/20 border-b bg-neutral-950/90 backdrop-blur-sm"
		>
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
				<span className="font-serif text-red-800/80 text-sm tracking-widest">
					DEPT. OF PORTFOLIO
				</span>

				<div className="flex gap-1">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`relative px-3 py-1.5 font-mono text-xs tracking-wider transition-colors ${
									isActive
										? "bg-red-900/30 text-red-400"
										: "text-stone-500 hover:text-stone-300"
								}`}
							>
								<span className="hidden sm:inline">{item.label}</span>
								<span className="sm:hidden">{item.code}</span>
								{isActive && (
									<motion.div
										layoutId="noirActiveTab"
										className="absolute bottom-0 left-0 h-px w-full bg-red-700"
										initial={false}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
										}}
									/>
								)}
							</Link>
						);
					})}
				</div>
			</div>
		</motion.nav>
	);
}
