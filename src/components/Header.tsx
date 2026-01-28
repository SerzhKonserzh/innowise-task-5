'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NavMenu } from './NavMenu';
import { CookingPotIcon } from '@/components/ui/cooking-pot';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Search } from 'lucide-react';

export function Header() {

	return (
		<header className="sticky top-0 z-50 w-full border-b flex items-center justify-center bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container flex flex-col md:flex-row h-24 md:h-auto items-center md:justify-between gap-2 md:gap-6 px-4 py-2">
				<div className="flex w-full md:w-auto items-center justify-between">
					<Link
						href="/"
						className="flex items-center gap-2 text-xl font-bold hover:text-hover"
					>
						<CookingPotIcon />
						Recipify
					</Link>
					<div className="md:hidden">
						<NavMenu />
					</div>
				</div>
				<div className="w-full flex items-center justify-center">
					<InputGroup className="w-full md:max-w-lg">
						<InputGroupInput placeholder="Search..." />
						<InputGroupAddon>
							<Search />
						</InputGroupAddon>
					</InputGroup>
				</div>
				<div className="hidden md:block">
					<NavMenu />
				</div>
			</div>
		</header>
	);
}
