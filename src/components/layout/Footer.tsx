"use client";

import { motion } from "framer-motion";
import { BookOpen, Code, House, LayoutGrid, Mail, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ name: "Home", href: "/", icon: House },
	{ name: "About", href: "/about", icon: User },
	{ name: "Experience", href: "/experience", icon: Code },
	{ name: "Projects", href: "/projects", icon: LayoutGrid },
	{ name: "Blog", href: "/blog", icon: BookOpen },
	{ name: "Contact", href: "/contact", icon: Mail },
];

export function Footer() {
	const pathname = usePathname();

	return (
		<motion.nav
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
			className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
		>
			<div className="flex gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
				{navItems.map((item, index) => {
					const isActive =
						pathname === item.href ||
						(item.href === "/blog" && pathname.startsWith("/blog"));
					const Icon = item.icon;

					return (
						<motion.div
							key={item.name}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
						>
							<Link
								href={item.href}
								className={`group relative flex h-16 w-20 flex-col items-center justify-center gap-1 rounded-xl transition-all duration-300 ${
									isActive
										? "bg-white text-black shadow-lg shadow-white/20"
										: "text-neutral-400 hover:bg-white/10 hover:text-white"
								}`}
							>
								{isActive && (
									<motion.div
										layoutId="activeTab"
										className="absolute inset-0 rounded-xl bg-white"
										initial={false}
										transition={{ duration: 0.3, ease: "easeInOut" }}
									/>
								)}

								<motion.div
									className="relative z-10"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								>
									<Icon
										className={`h-5 w-5 ${isActive ? "text-black" : ""}`}
										strokeWidth={2}
									/>
								</motion.div>

								<span
									className={`relative z-10 font-medium text-xs ${isActive ? "text-black" : ""}`}
								>
									{item.name}
								</span>

								{!isActive && (
									<motion.div
										className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100"
										transition={{ duration: 0.2 }}
									/>
								)}
							</Link>
						</motion.div>
					);
				})}
			</div>
		</motion.nav>
	);
}
