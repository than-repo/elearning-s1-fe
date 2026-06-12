import Link from "next/link";

export type PublicNavLink = {
  href: string;
  label: string;
};

type NavLinkProps = {
  link: PublicNavLink;
};

export function NavLink({ link }: NavLinkProps) {
  return (
    <Link
      href={link.href}
      className="text-xs font-normal leading-none text-white/70 transition-colors hover:text-white"
    >
      {link.label}
    </Link>
  );
}
