'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export function LocalTime() {
	const [time, setTime] = useState<string>('');

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const timeString = now.toLocaleTimeString('en-DK', {
				timeZone: 'Europe/Copenhagen',
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
			});
			setTime(timeString);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='flex items-center justify-center gap-2 w-32 px-4 py-2 bg-neutral-900/30 border border-neutral-800 rounded-full backdrop-blur-sm'>
			<Clock className='w-4 h-4 text-neutral-400' strokeWidth={1.5} />
			<span className='text-neutral-300 font-mono text-sm'>{time}</span>
		</div>
	);
}
