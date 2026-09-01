"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginUser, LoginUserInput } from "@/features/auth/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/features/auth/store/register.store";

function page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUser),
    mode: "all",
  });

  const login = useUserStore((state) => state.login);

  const onSubmit = async (data: LoginUserInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = login(data.email, data.password);

    if (!user) {
      toast.error("Invalid email or password");
      return;
    }

    Cookies.set(
      "user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
      {
        expires: 10,
        sameSite: "lax",
      },
    );

    toast.success(`Welcome ${user.name}`);

    reset();
    router.push("/");
  };

  return (
    <main className="bg-gray-50 text-gray-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <section className="flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">
          <Card className="border-gray-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="space-y-2  text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Welcome back
              </CardTitle>

              <CardDescription className="text-sm text-gray-500 dark:text-zinc-400">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 dark:text-zinc-200"
                  >
                    Email
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />

                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 transition-colors focus-visible:border-blue-600 focus-visible:ring-blue-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-500/20"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700 dark:text-zinc-200"
                    >
                      Password
                    </Label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 pr-10 transition-colors focus-visible:border-blue-600 focus-visible:ring-blue-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-500/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full cursor-pointer rounded-xl bg-blue-800 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>

                <p className="pt-2 text-center text-sm text-gray-500 dark:text-zinc-400">
                  Don&apos;t have an account?
                  <Link
                    href="/register"
                    className="font-semibold pl-1 text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Create an account
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default page;
