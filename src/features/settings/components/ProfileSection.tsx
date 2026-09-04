"use client";

import { Pencil, Mail, User } from "lucide-react";
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
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Profile
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal information.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-foreground transition hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <Pencil className="h-4 w-4" />

          <span className="hidden sm:inline">
            Edit Profile
          </span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {/* Cover */}
        <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 sm:h-28" />

        {/* Profile Content */}
        <div className="px-4 pb-5 sm:px-6 sm:pb-6">
          {/* Avatar */}
          <div className="-mt-10 mb-5 flex items-end justify-between sm:-mt-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-blue-900 text-xl font-bold text-white shadow-md dark:border-zinc-900 sm:h-24 sm:w-24 sm:text-2xl">
              {initials}
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-5">
            {/* Name */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <User className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  Full Name
                </p>

                <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                  {user.name}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Mail className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  Email Address
                </p>

                <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;