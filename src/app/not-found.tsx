import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "404",
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center px-6">
			<div className="w-full max-w-md">
				<h1 className="font-bold text-5xl tracking-tight md:text-6xl">404</h1>
				<p className="mt-3 text-neutral-500">page not found.</p>
				<Link
					href="/"
					className="mt-5 inline-block text-neutral-500 transition-colors duration-200 hover:text-white"
				>
					go back
				</Link>
			</div>
		</div>
	);
}
