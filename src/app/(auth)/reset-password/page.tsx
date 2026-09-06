"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import z from "zod";
import { useUserStore } from "@/features/auth/store/register.store";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
  });

  const updatePassword = useUserStore((state) => state.updatePassword);

  const onSubmit = async (data: ResetPasswordInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = searchParams.get("email");

    if (!email) {
      toast.error("Invalid reset request.");
      return;
    }

    const success = updatePassword(email, data.password);

    if (!success) {
      toast.error("User not found.");
      return;
    }

    toast.success("Password reset successfully!");

    router.push("/login");
  };

  return (
    <section className="flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">
        <Card className="ring-0! bg-white shadow-sm dark:bg-zinc-900">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Reset your password
            </CardTitle>

            <CardDescription className="text-sm leading-6 text-gray-500 dark:text-zinc-400">
              Create a new password for your account. Make sure it is strong and
              easy for you to remember.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700 dark:text-zinc-200"
                >
                  New password
                </Label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-gray-700 dark:text-zinc-200"
                >
                  Confirm password
                </Label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />

                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    {...register("confirmPassword")}
                    className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 pr-10 transition-colors focus-visible:border-blue-600 focus-visible:ring-blue-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full cursor-pointer rounded-xl bg-blue-800 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {isSubmitting ? "Resetting password..." : "Reset password"}
              </Button>

              <p className="pt-2 text-center text-sm text-gray-500 dark:text-zinc-400">
                Remember your password?
                <Link
                  href="/login"
                  className="pl-1 font-semibold text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Page;
