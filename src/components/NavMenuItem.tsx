import Link from "next/link";

interface Props {
  href: string;
  name: string;
}

export function NavMenuItem({href, name}: Props) {
  return <Link
						href={href}
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						{name}
					</Link>
}
