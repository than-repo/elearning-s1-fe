import type { Metadata } from "next";

import { PublicNavbar } from "@/components/layout/public-navbar/public-navbar";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { EditProfileForm } from "@/features/users/components/edit-profile-form";

export const metadata: Metadata = {
  title: "Edit Profile | E-Learning System",
  description: "Update your learning profile details.",
};

const navLinks = [{ href: "/courses", label: "Courses" }];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-muted text-foreground">
      <PublicNavbar brandLabel="E-Learning System" links={navLinks} />
      <ProtectedRoute>
        <section className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary">Account</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">
              Edit Profile
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Manage the safe profile details used across your learning account.
            </p>
          </div>
          <EditProfileForm />
        </section>
      </ProtectedRoute>
    </main>
  );
}
