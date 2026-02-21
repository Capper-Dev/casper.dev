"use client";

import type { ReactNode } from "react";
import { TerminalNav } from "@/components/designs/terminal/TerminalNav";
import { useDesign } from "@/lib/design-context";
import { DesignSwitcher } from "./DesignSwitcher";
import { Footer } from "./Footer";

export function DesignShell({ children }: { children: ReactNode }) {
	const { design } = useDesign();

	if (design === "terminal") {
		return (
			<div className="relative min-h-screen bg-black font-mono text-emerald-400">
				<div className="terminal-scanline pointer-events-none fixed inset-0 z-50" />
				<TerminalNav />
				<DesignSwitcher />
				<main className="relative z-10 min-h-screen pt-14">{children}</main>
			</div>
		);
	}

	return (
		<div className="relative h-screen bg-black text-white">
			<div className="fixed inset-0 -z-10 bg-gradient-to-br from-neutral-900 via-black to-neutral-900" />
			<Footer />
			<DesignSwitcher />
			<main className="relative z-10 h-screen pb-32">{children}</main>
		</div>
	);
}
