import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "../NavBar/ThemeToggle";
import { Logo } from "@/assets/images/images";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-app-bg text-app-foreground transition-colors">
      {/* Navbar */}{" "}
      <header className="sticky top-0 z-50 pt-5">
        {" "}
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {" "}
          <Link
            href="/"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            {" "}
            <Image
              src={Logo}
              alt="Logo"
              priority
              className="h-auto w-[120px] sm:w-[140px]"
            />{" "}
          </Link>
          <ThemeToggle />
        </div>
      </header>
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">{children}</div>

        <p className="mt-6 text-center text-xs text-app-muted">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </main>
    </div>
  );
}
