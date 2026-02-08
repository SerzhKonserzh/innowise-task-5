import Link from "next/link";

interface Props {
  href: string;
  name: string;
	isActive?: boolean;
	icon?: React.ReactNode;
}

export function NavMenuItem({href, name, isActive, icon}: Props) {
  return <Link
						href={href}
						className={"flex items-center justify-center gap-2 md:gap-0 md:flex-col text-sm font-medium transition-colors hover:text-hover" + (isActive ? " text-active" : "")}
					>
						{icon}
						{name}
					</Link>
}
