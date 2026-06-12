import Link from "next/link";

type BrandLinkProps = {
  href?: string;
  label: string;
};

export function BrandLink({ href = "/", label }: BrandLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold leading-none text-white transition-opacity hover:opacity-80"
    >
      {label}
    </Link>
  );
}
