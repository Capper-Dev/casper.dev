import type { Metadata } from "next";
import { Home } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
	title: "404 - Page Not Found",
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<div className="flex h-screen items-center justify-center px-6">
			<div className="space-y-6 text-center">
				<h1 className="font-bold text-8xl text-neutral-600">404</h1>

				<div className="space-y-4">
					<h2 className="font-semibold text-2xl text-white">Page Not Found</h2>
					<p className="mx-auto max-w-md text-neutral-400">
						The page you&apos;re looking for doesn&apos;t exist or has been
						moved.
					</p>
				</div>

				<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Link
						href="/"
						className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-neutral-200"
					>
						<Home className="h-4 w-4" />
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
}
