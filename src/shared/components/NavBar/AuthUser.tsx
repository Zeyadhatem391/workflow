"use client";

import { getCurrentUser } from "@/features/auth/helper/auth";
import Link from "next/link";

function AuthUser() {
  const user = getCurrentUser();

  if (!user) {
    return (
      <Link href="/login">
        <div className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
          Login
        </div>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-sm font-semibold text-white">
        {user.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </div>

      <span className="hidden lg:block text-sm font-semibold text-gray-900 dark:text-zinc-100">
        {user.name}
      </span>
    </div>
  );
}

export default AuthUser;
