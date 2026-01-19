"use client"

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
	{ name: 'Main', href: '/' },
	{ name: 'Catalog', href: '/catalog' },
	{ name: 'About', href: '/about' }
];

export function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4">
				<Link href="/" className="text-xl font-bold">
					MyShop
				</Link>

				<nav className="hidden md:flex items-center gap-6">
					{navItems.map(item => (
						<Link
							key={item.href}
							href={item.href}
							className="text-sm font-medium transition-colors hover:text-primary"
						>
							{item.name}
						</Link>
					))}
				</nav>


					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild className="md:hidden">
							<Button variant="ghost" size="icon">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Меню</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left">
							<nav className="flex flex-col gap-4">
								{navItems.map(item => (
									<Link
										key={item.href}
										href={item.href}
										className="text-lg font-medium"
										onClick={() => setIsOpen(false)}
									>
										{item.name}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
			</div>
		</header>
	);
}
