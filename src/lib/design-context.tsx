"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export type DesignId = "glass" | "terminal" | "noir";

interface DesignContextValue {
	design: DesignId;
	setDesign: (id: DesignId) => void;
}

const DesignContext = createContext<DesignContextValue | null>(null);

const STORAGE_KEY = "portfolio-design";

export function DesignProvider({ children }: { children: ReactNode }) {
	const [design, setDesignState] = useState<DesignId | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "glass" || stored === "terminal" || stored === "noir") {
			setDesignState(stored);
		} else {
			setDesignState("glass");
		}
	}, []);

	const setDesign = (id: DesignId) => {
		setDesignState(id);
		localStorage.setItem(STORAGE_KEY, id);
	};

	if (design === null) return null;

	return (
		<DesignContext.Provider value={{ design, setDesign }}>
			{children}
		</DesignContext.Provider>
	);
}

export function useDesign() {
	const ctx = useContext(DesignContext);
	if (!ctx) throw new Error("useDesign must be used within DesignProvider");
	return ctx;
}
