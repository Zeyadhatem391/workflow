"use client";
import { ReactNode } from "react";
import ZustendProviders from "./ZustendProviders";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";

interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <ZustendProviders>
          {children}
          <Toaster position="top-center" />
        </ZustendProviders>
      </ThemeProvider>
    </>
  );
}
