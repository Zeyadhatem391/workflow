"use client";

import { Mail } from "lucide-react";
import emailjs from "@emailjs/browser";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/features/auth/store/register.store";
import z from "zod";

export const emailVerification = z.object({
  email: z.email("Please enter a valid email address").trim().toLowerCase(),
});

export type emailVerificationInput = z.infer<typeof emailVerification>;

function page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<emailVerificationInput>({
    resolver: zodResolver(emailVerification),
    mode: "all",
  });

  const findEmail = useUserStore((state) => state.findUserByEmail);

  const resetOtp = useUserStore((state) => state.setResetOtp);

  const onSubmit = async (data: emailVerificationInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = findEmail(data.email);

    if (!user) {
      toast.error("This email does not exist.");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = Date.now() + 5 * 60 * 1000;

    resetOtp(data.email, otp, expiresAt);

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        passcode: otp,
        email: data.email,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    );

    reset();
    router.push(`/verify?email=${data.email}`);
  };

  return (
    <section className="flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">
        <Card className="ring-0! bg-white shadow-sm dark:bg-zinc-900">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Forgot your password?
            </CardTitle>

            <CardDescription className="text-sm text-gray-500 dark:text-zinc-400">
              Enter your email address and we’ll send you a verification code to
              reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700 dark:text-zinc-200"
                >
                  Email address
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full cursor-pointer rounded-xl bg-blue-800 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {isSubmitting ? "Sending code..." : "Send verification code"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default page;
