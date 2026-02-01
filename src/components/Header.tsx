'use client';

import Link from 'next/link';
import { NavMenu } from './NavMenu';
import { CookingPotIcon } from '@/components/ui/cooking-pot';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput
} from '@/components/ui/input-group';
import { Search } from 'lucide-react';
import { PAGES } from '../config/pages.config';
import { UserIcon } from '@/components/ui/user';
import { SearchDropdown } from './SearchDropdown';

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b flex items-center justify-center bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container flex flex-col md:flex-row h-auto items-center md:justify-between gap-2 md:gap-6 px-4 py-2">
				<div className="flex w-full md:w-auto items-center justify-between">
					<Link
						href={PAGES.HOME}
						className="flex items-center gap-2 text-xl font-bold hover:text-hover"
					>
						<CookingPotIcon />
						Recipify
					</Link>
					<div className="md:hidden flex items-center">
						<div className="flex flex-col items-center mx-2">
							<Link
								href={PAGES.HOME}
								className={
									'flex flex-col justify-center items-center text-sm font-medium transition-colors hover:text-hover'
								}
							>
								<UserIcon />
								Login
							</Link>
						</div>
						<NavMenu />
					</div>
				</div>
				<div className="w-full flex items-center justify-center">
					<SearchDropdown />
				</div>
				<div className="hidden md:flex flex-col items-center">
					<Link
						href={PAGES.HOME}
						className={
							'flex flex-col justify-center items-center text-sm font-medium transition-colors hover:text-hover'
						}
					>
						<UserIcon />
						Login
					</Link>
				</div>
				<div className="hidden md:block">
					<NavMenu />
				</div>
			</div>
		</header>
	);
}
