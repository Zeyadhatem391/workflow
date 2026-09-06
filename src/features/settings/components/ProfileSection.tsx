"use client";

import { getCurrentUser } from "@/features/auth/helper/auth";

function ProfileSection() {
  const user = getCurrentUser();

  if (!user) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-muted-foreground">
          User information is not available.
        </p>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Profile</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-md sm:h-28 sm:w-28 sm:text-3xl">
            {initials}
          </div>

          <h3 className="mt-4 text-lg font-semibold text-foreground sm:text-xl">
            {user.name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
