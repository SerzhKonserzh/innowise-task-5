'use client';

import Link from 'next/link';
import { PAGES } from '../config/pages.config';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavMenuItem } from './NavMenuItem';

const navItems = [
	{ name: 'Main', href: PAGES.HOME },
	{ name: 'About', href: PAGES.ABOUT }
];

export function NavMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<>
			<nav className="hidden md:flex items-center gap-6">
				{navItems.map(item => (
					<NavMenuItem key={item.name} href={item.href} name={item.name} />
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
					<SheetHeader className="sr-only">
						<SheetTitle>Menu</SheetTitle>
						<SheetDescription>
							Nav Menu
						</SheetDescription>
					</SheetHeader>
					<nav className="flex flex-col gap-4">
						{navItems.map(item => (
							<NavMenuItem key={item.name} href={item.href} name={item.name} />
						))}
					</nav>
				</SheetContent>
			</Sheet>
		</>
	);
}
