"use client"

import Link from 'next/link';
import { useState } from 'react';
import { NavMenu } from './NavMenu';



export function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4">
				<Link href="/" className="text-xl font-bold">
					MyShop
				</Link>

				<NavMenu />
			
			</div>
		</header>
	);
}
