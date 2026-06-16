"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { useAuth } from "@/features/auth/hooks/use-auth";

import { getMyProfile, updateMyProfile } from "../api/profile-api";
import type {
  ProfileGender,
  UpdateProfileInput,
  UserProfile,
} from "../types/profile";

const inputClasses =
  "mt-2 min-h-11 w-full rounded-md border border-border bg-background px-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-focus/20";

const genderOptions: Array<{ label: string; value: ProfileGender }> = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
  { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" },
];

type ProfileFormState = {
  avatarUrl: string;
  dateOfBirth: string;
  fullName: string;
  gender: "" | ProfileGender;
  phoneNumber: string;
};

const emptyFormState: ProfileFormState = {
  avatarUrl: "",
  dateOfBirth: "",
  fullName: "",
  gender: "",
  phoneNumber: "",
};

export function EditProfileForm() {
  const { accessToken, status, updateUser, user } = useAuth();
  const [form, setForm] = useState<ProfileFormState>(emptyFormState);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated" || !accessToken) {
      return;
    }

    const profileAccessToken = accessToken;
    let isMounted = true;

    async function loadProfile() {
      await Promise.resolve();

      if (!isMounted) {
        return;
      }

      setIsLoadingProfile(true);
      setLoadError(null);

      try {
        const nextProfile = await getMyProfile(profileAccessToken);

        if (!isMounted) {
          return;
        }

        setProfile(nextProfile);
        setForm(toFormState(nextProfile));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setLoadError(
          error instanceof Error
            ? error.message
            : "Unable to load your profile.",
        );
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, [accessToken, retryCount, status]);

  function updateField<Field extends keyof ProfileFormState>(
    field: Field,
    value: ProfileFormState[Field],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
    setFormError(null);
    setSuccessMessage(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accessToken) {
      setFormError("Your session is not ready. Please sign in again.");
      return;
    }

    const validationError = validateForm(form);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const updatedProfile = await updateMyProfile(
        accessToken,
        toUpdateProfileInput(form),
      );
      setProfile(updatedProfile);
      setForm(toFormState(updatedProfile));
      updateUser(updatedProfile);
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to update your profile.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingProfile) {
    return (
      <div className="rounded-lg border border-border bg-card px-5 py-14 text-center text-muted-foreground">
        Loading your profile...
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-border bg-card px-5 py-14 text-center">
        <p className="text-lg font-semibold">Profile could not be loaded</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          {loadError}
        </p>
        <button
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-pill border border-primary bg-primary px-5 text-sm font-normal text-primary-foreground transition-transform active:scale-95"
          onClick={() => setRetryCount((currentCount) => currentCount + 1)}
          type="button"
        >
          Try again
        </button>
      </div>
    );
  }

  const displayProfile = profile ?? user;
  const displayName =
    form.fullName.trim() || displayProfile?.fullName || "User";

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
      <form
        className="rounded-lg border border-border bg-card p-5 sm:p-6"
        onSubmit={handleSubmit}
      >
        <div>
          <p className="text-sm font-semibold text-primary">Account profile</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight">
            Edit profile
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Keep your public learning identity current. Email, password, and
            role changes are handled outside this profile form.
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold" htmlFor="fullName">
              Full name
            </label>
            <input
              autoComplete="name"
              className={inputClasses}
              id="fullName"
              maxLength={100}
              minLength={2}
              name="fullName"
              onChange={(event) => updateField("fullName", event.target.value)}
              required
              type="text"
              value={form.fullName}
            />
          </div>

          <div>
            <label className="text-sm font-semibold" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              autoComplete="tel"
              className={inputClasses}
              id="phoneNumber"
              name="phoneNumber"
              onChange={(event) =>
                updateField("phoneNumber", event.target.value)
              }
              type="tel"
              value={form.phoneNumber}
            />
          </div>

          <div>
            <label className="text-sm font-semibold" htmlFor="dateOfBirth">
              Date of birth
            </label>
            <input
              className={inputClasses}
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={(event) =>
                updateField("dateOfBirth", event.target.value)
              }
              type="date"
              value={form.dateOfBirth}
            />
          </div>

          <div>
            <label className="text-sm font-semibold" htmlFor="gender">
              Gender
            </label>
            <select
              className={inputClasses}
              id="gender"
              name="gender"
              onChange={(event) =>
                updateField(
                  "gender",
                  event.target.value as ProfileFormState["gender"],
                )
              }
              value={form.gender}
            >
              <option value="">Not specified</option>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold" htmlFor="avatarUrl">
              Avatar URL
            </label>
            <input
              autoComplete="url"
              className={inputClasses}
              id="avatarUrl"
              name="avatarUrl"
              onChange={(event) => updateField("avatarUrl", event.target.value)}
              placeholder="https://example.com/avatar.jpg"
              type="url"
              value={form.avatarUrl}
            />
          </div>
        </div>

        {formError ? (
          <p className="mt-6 rounded-md border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
            {formError}
          </p>
        ) : null}

        {successMessage ? (
          <p className="mt-6 rounded-md border border-success/20 bg-success/5 px-4 py-3 text-sm text-success">
            {successMessage}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-pill border border-primary bg-primary px-6 text-base font-normal text-primary-foreground transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-pill border border-border px-6 text-base font-normal text-foreground transition-colors hover:bg-muted"
            href="/courses"
          >
            Cancel
          </Link>
        </div>
      </form>

      <aside className="rounded-lg border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-pill bg-primary/10 text-xl font-semibold text-primary">
            {getInitial(displayName)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{displayName}</p>
            <p className="truncate text-sm text-muted-foreground">
              {displayProfile?.email ?? "Signed-in account"}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 text-sm">
          <ProfileFact label="Role" value={formatRole(displayProfile?.role)} />
          <ProfileFact
            label="Email status"
            value={profile?.emailVerified ? "Verified" : "Not verified yet"}
          />
          <ProfileFact
            label="Last sign in"
            value={formatNullableDate(profile?.lastLoginAt)}
          />
        </dl>
      </aside>
    </div>
  );
}

type ProfileFactProps = {
  label: string;
  value: string;
};

function ProfileFact({ label, value }: ProfileFactProps) {
  return (
    <div className="rounded-md border border-border bg-surface-pearl px-4 py-3">
      <dt className="font-semibold text-ink-muted">{label}</dt>
      <dd className="mt-1 text-muted-foreground">{value}</dd>
    </div>
  );
}

function toFormState(profile: UserProfile): ProfileFormState {
  return {
    avatarUrl: profile.avatarUrl ?? "",
    dateOfBirth: toDateInputValue(profile.dateOfBirth),
    fullName: profile.fullName ?? "",
    gender: profile.gender ?? "",
    phoneNumber: profile.phoneNumber ?? "",
  };
}

function toUpdateProfileInput(form: ProfileFormState): UpdateProfileInput {
  return {
    avatarUrl: form.avatarUrl,
    dateOfBirth: form.dateOfBirth,
    fullName: form.fullName,
    gender: form.gender || null,
    phoneNumber: form.phoneNumber,
  };
}

function validateForm(form: ProfileFormState) {
  const fullName = form.fullName.trim();

  if (fullName.length < 2 || fullName.length > 100) {
    return "Full name must be between 2 and 100 characters.";
  }

  if (form.avatarUrl.trim()) {
    try {
      const avatarUrl = new URL(form.avatarUrl.trim());

      if (!["http:", "https:"].includes(avatarUrl.protocol)) {
        return "Avatar URL must start with http or https.";
      }
    } catch {
      return "Avatar URL must be a valid URL.";
    }
  }

  return null;
}

function toDateInputValue(value?: string | null) {
  if (!value) {
    return "";
  }

  return value.split("T")[0];
}

function formatNullableDate(value?: string | null) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatRole(role?: string) {
  if (!role) {
    return "User";
  }

  return role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "U";
}
