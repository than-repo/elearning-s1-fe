import { ButtonLink } from "@/components/ui/button-link";

import { UserMenu, type PublicNavbarUser } from "./user-menu";

type AuthActionsProps = {
  currentUser?: PublicNavbarUser | null;
  isLoading?: boolean;
  onLogout?: () => Promise<void> | void;
};

export function AuthActions({
  currentUser = null,
  isLoading = false,
  onLogout,
}: AuthActionsProps) {
  if (isLoading) {
    return (
      <div className="hidden min-h-8 items-center rounded-pill border border-white/10 px-4 text-xs text-white/60 sm:flex">
        Account
      </div>
    );
  }

  if (currentUser) {
    return <UserMenu onLogout={onLogout} user={currentUser} />;
  }

  return (
    <div className="flex items-center gap-2">
      <ButtonLink href="/login" size="sm" variant="ghostOnDark">
        Login
      </ButtonLink>
      <ButtonLink className="min-h-8 px-4 text-sm" href="/register" size="sm">
        Register
      </ButtonLink>
    </div>
  );
}
