'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavMenu } from './NavMenu';
import { CookingPotIcon } from '@/components/ui/cooking-pot';
import { PAGES } from '../config/pages.config';
import { UserIcon } from '@/components/ui/user';
import { SearchDropdown } from './SearchDropdown';
import { useAuthStore } from '@/src/store/auth.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function Header() {
	const { user, logout } = useAuthStore();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push(PAGES.HOME);
	};

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
							{user ? (
								<div className="flex flex-col items-center">
									<Button
										onClick={handleLogout}
										variant="ghost"
										className="text-sm hover:text-hover flex hover:bg-transparent gap-2 p-0 h-auto"
									>
										<Avatar className="h-7 w-7">
											<AvatarImage src={user.image} alt={user.firstName} />
											<AvatarFallback>
												{user.firstName.charAt(0)}
											</AvatarFallback>
										</Avatar>
										Logout
									</Button>
								</div>
							) : (
								<div className="flex justify-center">
									<div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
								</div>
							)}
						</div>
						<NavMenu />
					</div>
				</div>
				<div className="w-full flex items-center justify-center">
					<SearchDropdown />
				</div>
				<div className="hidden md:flex flex-col items-center">
					{user ? (
						<div className="flex flex-col items-center">
							<Button
								onClick={handleLogout}
								variant="ghost"
								className="text-sm hover:text-hover flex flex-col hover:bg-transparent gap-0 p-0 h-auto"
							>
								<Avatar className="h-7 w-7">
									<AvatarImage src={user.image} alt={user.firstName} />
									<AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
								</Avatar>
								Logout
							</Button>
						</div>
					) : (
						<div className="flex justify-center">
							<div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
						</div>
					)}
				</div>
				<div className="hidden md:block">
					<NavMenu />
				</div>
			</div>
		</header>
	);
}
