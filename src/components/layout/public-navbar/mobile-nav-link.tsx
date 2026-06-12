import Link from "next/link";

type MobileNavLinkProps = {
  href: string;
  label: string;
};

export function MobileNavLink({ href, label }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className="hidden rounded-pill border border-white/25 px-3 py-1.5 text-xs font-normal text-white transition-colors hover:border-white sm:inline-flex md:hidden"
    >
      {label}
    </Link>
  );
}
