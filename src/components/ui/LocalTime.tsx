"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function LocalTime() {
	const [time, setTime] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const timeString = now.toLocaleTimeString("en-DK", {
				timeZone: "Europe/Copenhagen",
				hour12: false,
				hour: "2-digit",
				minute: "2-digit",
			});
			setTime(timeString);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex w-32 items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/30 px-4 py-2 backdrop-blur-sm">
			<Clock className="h-4 w-4 text-neutral-400" strokeWidth={1.5} />
			<span className="font-mono text-neutral-300 text-sm">{time}</span>
		</div>
	);
}
