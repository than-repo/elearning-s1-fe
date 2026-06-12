"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/use-auth";

import { AuthActions } from "./auth-actions";
import { BrandLink } from "./brand-link";
import { DesktopNav } from "./desktop-nav";
import { MobileNavLink } from "./mobile-nav-link";
import type { PublicNavLink } from "./nav-link";
import type { PublicNavbarUser } from "./user-menu";

type PublicNavbarProps = {
  brandLabel: string;
  links: PublicNavLink[];
  currentUser?: PublicNavbarUser | null;
};

export function PublicNavbar({
  brandLabel,
  currentUser = null,
  links,
}: PublicNavbarProps) {
  const router = useRouter();
  const { logout, status, user } = useAuth();
  const resolvedLinks =
    status === "authenticated" && user?.role === "LEARNER"
      ? addLearnerLinks(links)
      : links;
  const mobileLink =
    resolvedLinks.find((link) => link.href === "/my-courses") ?? resolvedLinks[0];
  const sessionUser =
    status === "authenticated" && user
      ? { email: user.email, name: user.fullName, role: user.role }
      : null;
  const resolvedUser = currentUser ?? sessionUser;

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-surface-black text-white">
      <div className="mx-auto flex h-11 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <BrandLink label={brandLabel} />
        <DesktopNav links={resolvedLinks} />
        <AuthActions
          currentUser={resolvedUser}
          isLoading={status === "loading"}
          onLogout={handleLogout}
        />
        {mobileLink ? (
          <MobileNavLink href={mobileLink.href} label={mobileLink.label} />
        ) : null}
      </div>
    </header>
  );
}

function addLearnerLinks(links: PublicNavLink[]) {
  if (links.some((link) => link.href === "/my-courses")) {
    return links;
  }

  return [...links, { href: "/my-courses", label: "My Courses" }];
}
