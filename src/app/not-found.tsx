import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='h-screen flex items-center justify-center px-6'>
			<div className='text-center space-y-6'>
				<h1 className='text-8xl font-bold text-neutral-600'>404</h1>

				<div className='space-y-4'>
					<h2 className='text-2xl font-semibold text-white'>Page Not Found</h2>
					<p className='text-neutral-400 max-w-md mx-auto'>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
				</div>

				<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
					<Link href='/' className='inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors'>
						<Home className='w-4 h-4' />
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
}
