'use client';

import Link from 'next/link';
import { PAGES } from '../config/pages.config';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Heart, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavMenuItem } from './NavMenuItem';
import { CartIcon } from '@/components/ui/cart';

const navItems = [
	{ name: 'Main', href: PAGES.HOME, icon: <CartIcon className='flex justify-center w-7 h-7'/> },
	{ name: 'About', href: PAGES.ABOUT, icon: <CartIcon className='flex justify-center w-7 h-7'/> },
	{ name: 'Favorites', href: PAGES.FAVORITES, icon: <Heart className='flex justify-center w-7 h-7'/> }
];

export function NavMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<>
			<nav className="hidden md:flex items-center gap-4">
				{navItems.map(item => (
					<NavMenuItem key={item.name} href={item.href} icon={item.icon} name={item.name} isActive={pathname === item.href ? true : false}/>
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
							<NavMenuItem key={item.name} href={item.href} icon={item.icon} name={item.name} isActive={pathname === item.href ? true : false}/>
						))}
					</nav>
				</SheetContent>
			</Sheet>
		</>
	);
}
