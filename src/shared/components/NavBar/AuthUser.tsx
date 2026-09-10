"use client";

import { getCurrentUser } from "@/features/auth/helper/auth";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogoutButton from "./LogoutButton";

function AuthUser() {
  const user = getCurrentUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm font-semibold text-app-icon transition-colors hover:text-app-icon-hover"
      >
        Login{" "}
      </Link>
    );
  }

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-menu-active-bg focus-visible:ring-offset-2 focus-visible:ring-offset-layout-bg">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-menu-active-bg text-sm font-semibold text-menu-active-text">
          {initials}
        </div>

        <span className="hidden max-w-32 truncate text-sm font-semibold text-app-icon-hover lg:block">
          {user.name}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-48 bg-layout-bg text-app-icon-hover ring-0 shadow-lg"
      >
        <DropdownMenuItem
          asChild
          className="cursor-pointer px-3 py-2 text-sm font-medium dark:hover:bg-gray-300/10 hover:bg-gray-100/10"
        >
          <Link href="/dashboard/settings?tab=profile" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
        >
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthUser;
