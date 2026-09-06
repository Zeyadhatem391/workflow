"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";

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
import { useForm } from "react-hook-form";
import { AddUser, AddUserInput } from "@/features/auth/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/features/auth/store/register.store";
import { toast } from "sonner";

function page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserInput>({
    resolver: zodResolver(AddUser),
    mode: "all",
    defaultValues: {
      id: crypto.randomUUID(),
    },
  });

  const { isEmailTaken, addUser } = useUserStore();

  const onSubmit = async (data: AddUserInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (isEmailTaken(data.email)) {
      toast.error("Email already exists");
      return;
    }

    addUser(data);

    reset();
    router.push("/login");
  };

  return (
    <section className="w-full max-w-md">
      <Card className="ring-0! bg-white shadow-sm dark:bg-zinc-900">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create an account
          </CardTitle>

          <CardDescription className="text-sm text-gray-500 dark:text-zinc-400">
            Create your account to start managing your projects and tasks
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700 dark:text-zinc-200"
              >
                Full Name
              </Label>

              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />

                <Input
                  id="name"
                  type="text"
                  placeholder="Zeyad Hatem"
                  {...register("name")}
                  className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 transition-colors focus-visible:border-blue-600 focus-visible:ring-blue-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-500/20"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

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
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 dark:text-zinc-200"
              >
                Password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password")}
                  className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 pr-10 transition-colors focus-visible:border-blue-600 focus-visible:ring-blue-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
              {isSubmitting ? "Creating..." : "Create account"}
            </Button>

            <p className="pt-2 text-center text-sm text-gray-500 dark:text-zinc-400">
              Already have an account?
              <Link
                href="/login"
                className="font-semibold pl-1 text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default page;
