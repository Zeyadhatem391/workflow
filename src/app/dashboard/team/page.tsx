"use client";

import { useState } from "react";
import { useUserStore } from "@/features/auth/store/register.store";
import {
  UserRoundArrowLeft,
  Search,
  UserCheck,
  Users,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Page() {
  const users = useUserStore((state) => state.users);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-5 shadow-sm dark:bg-zinc-900 sm:p-6">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Users className="h-5 w-5" />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Team
          </h1>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Connect with people, manage your team, and build your project teams.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search people by name or email..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-blue-500 dark:focus:bg-zinc-950"
        />
      </div>

      <section className="rounded-xl border border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 p-4 dark:border-zinc-800 sm:p-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              My Team
            </h2>

            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Manage your team and communicate with your team.
            </p>
          </div>

          <UserCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-4 sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  {getInitials(user.name)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <Link href="/dashboard/tasks/add">
                  <button
                    type="button"
                    title="Assign a task"
                    aria-label="Assign a task"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition hover:bg-gray-100 hover:text-foreground dark:hover:bg-zinc-800 sm:h-9 sm:w-auto sm:gap-2 sm:px-3"
                  >
                    <UserRoundArrowLeft className="h-4 w-4" />

                    <span className="hidden text-sm font-medium sm:inline">
                      Assigning A Task
                    </span>
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <UserPlus className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-foreground">
                User not registered
              </h3>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                No user is registered with
                <span className="font-medium text-foreground">
                  &quot;{search}&quot;
                </span>
                .
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Ask this person to register in the application first.
              </p>

              <Link
                href="/register"
                className="mt-4 inline-flex h-9 items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Page;