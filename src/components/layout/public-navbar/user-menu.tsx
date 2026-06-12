import Link from "next/link";

import type { UserRole } from "@/features/auth/types/auth";

export type PublicNavbarUser = {
  name: string;
  email?: string;
  role?: UserRole;
};

type UserMenuProps = {
  onLogout?: () => Promise<void> | void;
  user: PublicNavbarUser;
};

export function UserMenu({ onLogout, user }: UserMenuProps) {
  return (
    <details className="relative">
      <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 rounded-sm bg-white/10 px-3 text-xs font-normal text-white transition-colors hover:bg-white/15">
        <span>{user.name}</span>
      </summary>
      <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-border bg-card p-2 text-foreground">
        {user.email ? (
          <p className="border-b px-3 pb-2 text-xs text-muted-foreground">
            {user.email}
          </p>
        ) : null}
        {user.role === "LEARNER" ? (
          <Link
            href="/my-courses"
            className="block rounded-md px-3 py-2 text-sm font-normal hover:bg-muted"
          >
            My Courses
          </Link>
        ) : null}
        <Link
          href="/profile"
          className="block rounded-md px-3 py-2 text-sm font-normal hover:bg-muted"
        >
          Edit profile
        </Link>
        <button
          type="button"
          className="block w-full rounded-md px-3 py-2 text-left text-sm font-normal hover:bg-muted"
        >
          Change dark mode
        </button>
        <button
          onClick={onLogout}
          type="button"
          className="block w-full rounded-md px-3 py-2 text-left text-sm font-normal text-danger hover:bg-muted"
        >
          Logout
        </button>
      </div>
    </details>
  );
}
