"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import z from "zod";
import { useUserStore } from "@/features/auth/store/register.store";

const otpVerification = z.object({
  otp: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});

type OtpVerificationInput = z.infer<typeof otpVerification>;

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OtpVerificationInput>({
    resolver: zodResolver(otpVerification),
    defaultValues: {
      otp: "",
    },
    mode: "all",
  });

  const otp = watch("otp");

  // Countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    const number = value.replace(/\D/g, "").slice(-1);

    const currentOtp = otp.split("");

    currentOtp[index] = number;

    const newOtp = currentOtp.join("");

    setValue("otp", newOtp, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (number && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("New OTP:", newOtp);

    setCountdown(60);
    setIsResending(false);

    toast.success("A new verification code has been sent.");
  };

  const resetOtp = useUserStore((state) => state.resetOtp);

  const clearResetOtp = useUserStore((state) => state.clearResetOtp);

  const onSubmit = async (data: OtpVerificationInput) => {
    if (!resetOtp) {
      toast.error("Verification code not found.");
      return;
    }

    // هل انتهت الـ 5 دقائق؟
    if (Date.now() > resetOtp.expiresAt) {
      clearResetOtp();

      toast.error("Verification code has expired. Please request a new one.");

      return;
    }

    // هل الكود صحيح؟
    if (data.otp !== resetOtp.otp) {
      toast.error("Invalid verification code.");
      return;
    }

    toast.success("Verification successful!");

    router.push(`/reset-password?email=${resetOtp.email}`);
  };

  return (
    <main className="bg-gray-50 text-gray-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <section className="flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">
          <Card className="border-gray-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="space-y-3 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Verify your email
              </CardTitle>

              <CardDescription className="text-sm leading-6 text-gray-500 dark:text-zinc-400">
                We sent a 6-digit verification code to
                <span className="block font-semibold text-gray-900 dark:text-zinc-100">
                  {email}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center gap-2 sm:gap-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      value={otp[index] ?? ""}
                      onChange={(event) =>
                        handleOtpChange(index, event.target.value)
                      }
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      inputMode="numeric"
                      maxLength={1}
                      className="h-12 w-11 rounded-xl border-gray-200 bg-gray-50 text-center text-lg font-bold focus-visible:border-blue-600 focus-visible:ring-blue-600/20 sm:h-14 sm:w-12 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-500/20"
                    />
                  ))}
                </div>

                {errors.otp && (
                  <p className="text-center text-xs text-red-600 dark:text-red-400">
                    {errors.otp.message}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || otp.length !== 6}
                  className="h-11 w-full cursor-pointer rounded-xl bg-blue-800 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {isSubmitting ? "Verifying..." : "Verify code"}
                </Button>

                <div className="space-y-3 text-center">
                  {countdown > 0 ? (
                    <p className="text-xs text-gray-500 dark:text-zinc-400">
                      You can request a new code in{" "}
                      <span className="font-semibold text-gray-900 dark:text-zinc-100">
                        {countdown}s
                      </span>
                    </p>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleResend}
                      disabled={isResending}
                      className="cursor-pointer text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {isResending ? "Sending..." : "Resend verification code"}
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                    className="gap-2 text-xs text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Change email
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default Page;
