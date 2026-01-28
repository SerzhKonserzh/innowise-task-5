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
					<NavMenuItem key={item.name} href={item.href} name={item.name} isActive={pathname === item.href ? true : false}/>
				))}
			</nav>

			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild className="md:hidden">
					<Button variant="ghost" size="icon">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader className="sr-only">
						<SheetTitle>Menu</SheetTitle>
						<SheetDescription>
							Nav Menu
						</SheetDescription>
					</SheetHeader>
					<nav className="flex flex-col gap-4 p-4 items-start">
						{navItems.map(item => (
							<NavMenuItem key={item.name} href={item.href} name={item.name} isActive={pathname === item.href ? true : false}/>
						))}
					</nav>
				</SheetContent>
			</Sheet>
		</>
	);
}
