"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type DesignId, useDesign } from "@/lib/design-context";

const designs: { id: DesignId; name: string; color: string }[] = [
	{ id: "glass", name: "Glass", color: "bg-neutral-400" },
	{ id: "terminal", name: "Terminal", color: "bg-emerald-400" },
	{ id: "noir", name: "Noir", color: "bg-red-800" },
];

export function DesignSwitcher() {
	const { design, setDesign } = useDesign();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	return (
		<div ref={ref} className="fixed top-4 right-4 z-60">
			<motion.button
				type="button"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => setOpen((v) => !v)}
				className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-xl transition-colors hover:bg-black/80"
			>
				<Palette className="h-4 w-4" />
			</motion.button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: -4 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: -4 }}
						transition={{ duration: 0.15 }}
						className="absolute top-12 right-0 w-44 overflow-hidden rounded-xl border border-white/10 bg-black/80 p-1 shadow-2xl backdrop-blur-xl"
					>
						{designs.map((d) => (
							<button
								type="button"
								key={d.id}
								onClick={() => {
									setDesign(d.id);
									setOpen(false);
								}}
								className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-white transition-colors hover:bg-white/10"
							>
								<span className={`h-3 w-3 rounded-full ${d.color}`} />
								<span className="flex-1">{d.name}</span>
								{design === d.id && (
									<Check className="h-3.5 w-3.5 text-white/70" />
								)}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
