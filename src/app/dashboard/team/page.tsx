"use client";

import {
  UserPlus,
  MessageCircle,
  Search,
  UserCheck,
  Users,
} from "lucide-react";

const newUsers = [
  {
    id: 1,
    name: "Ahmed Mohamed",
    email: "ahmed@example.com",
  },
  {
    id: 2,
    name: "Omar Khaled",
    email: "omar@example.com",
  },
  {
    id: 3,
    name: "Sara Ali",
    email: "sara@example.com",
  },
];

const friends = [
  {
    id: 1,
    name: "Mohamed Hassan",
    email: "mohamed@example.com",
  },
  {
    id: 2,
    name: "Youssef Ahmed",
    email: "youssef@example.com",
  },
  {
    id: 3,
    name: "Mariam Adel",
    email: "mariam@example.com",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Page() {
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
          Connect with people, manage your friends, and build your project
          teams.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search people by name or email..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-blue-500 dark:focus:bg-zinc-950"
        />
      </div>

      <section className="rounded-xl border border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 p-4 dark:border-zinc-800 sm:p-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Discover People
            </h2>

            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Find people and add them to your friends.
            </p>
          </div>

          <UserPlus className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
          {newUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3 p-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                {getInitials(user.name)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {user.name}
                </p>

                <p className="truncate text-xs text-muted-foreground sm:text-sm">
                  {user.email}
                </p>
              </div>

              <button
                type="button"
                className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4" />

                <span className="hidden sm:inline">Add Friend</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 p-4 dark:border-zinc-800 sm:p-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              My Friends
            </h2>

            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Manage your friends and communicate with your team.
            </p>
          </div>

          <UserCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center gap-3 p-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                {getInitials(friend.name)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {friend.name}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {friend.email}
                </p>
              </div>

              <button
                type="button"
                title="Message"
                aria-label="Message"
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-gray-100 hover:text-foreground dark:hover:bg-zinc-800 sm:h-9 sm:w-auto sm:gap-2 sm:px-3"
              >
                <MessageCircle className="h-4 w-4" />

                <span className="hidden text-sm font-medium sm:inline">
                  Message
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Page;
