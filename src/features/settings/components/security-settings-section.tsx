const sectionClasses =
  "rounded-3xl border border-[#d9d9d9] bg-white p-6 shadow-sm";

const actionCardClasses =
  "flex flex-col gap-4 rounded-2xl border border-[#e6e6e6] bg-white p-5 sm:flex-row sm:items-center sm:justify-between";

const actionButtonClasses =
  "inline-flex h-11 items-center justify-center rounded-xl border border-[#d9d9d9] bg-white px-5 text-sm font-semibold text-[#111827] transition hover:bg-[#f7f7f7]";

const primaryButtonClasses =
  "inline-flex h-11 items-center justify-center rounded-xl bg-[#9fb1cf] px-5 text-sm font-semibold text-white transition hover:bg-[#879cbd]";

export function SecuritySettingsSection() {
  return (
    <section className={sectionClasses}>
      <h2 className="text-xl font-semibold text-[#1f1f1f]">Security</h2>
      <p className="mt-1 text-sm text-[#344563]">
        Manage your password, account recovery, and email verification settings.
      </p>

      <div className="mt-6 space-y-4">
        <div className={actionCardClasses}>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-[#111827]">Password</h3>
              <span className="rounded-full bg-[#eaf2ff] px-3 py-1 text-xs font-semibold text-[#0056d2]">
                Account protection
              </span>
            </div>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#344563]">
              Update your password regularly to help keep your account secure.
              You may need to confirm your current password before creating a
              new one.
            </p>
          </div>

          <button className={primaryButtonClasses} type="button">
            Change password
          </button>
        </div>

        <div className={actionCardClasses}>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-[#111827]">Forgot password</h3>
              <span className="rounded-full bg-[#f7f7f7] px-3 py-1 text-xs font-semibold text-[#5b6780]">
                Recovery
              </span>
            </div>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#344563]">
              If you cannot access your account, send a secure password reset
              link to your email address and create a new password.
            </p>
          </div>

          <button className={actionButtonClasses} type="button">
            Send reset link
          </button>
        </div>

        <div className={actionCardClasses}>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-[#111827]">
                Email verification
              </h3>
              <span className="rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-semibold text-[#027a48]">
                Recommended
              </span>
            </div>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#344563]">
              Verify your email address to protect your account, receive
              important security alerts, and recover access when needed.
            </p>
          </div>

          <button className={actionButtonClasses} type="button">
            Verify email
          </button>
        </div>
      </div>
    </section>
  );
}
