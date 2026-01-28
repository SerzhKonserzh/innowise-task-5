import Link from "next/link";

interface Props {
  href: string;
  name: string;
	isActive: boolean;
}

export function NavMenuItem({href, name, isActive}: Props) {
  return <Link
						href={href}
						className={"center text-sm font-medium transition-colors hover:text-hover" + (isActive ? " text-active" : "")}
					>
						{name}
					</Link>
}
