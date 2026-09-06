"use client";
import { ReactNode } from "react";
import ZustendProviders from "./ZustendProviders";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";
import { ProjectStatusInitializer } from "@/features/projects/helper/ProjectStatusInitializer";
import { ProjectPriorityInitializer } from "@/features/projects/helper/ProjectPriorityInitializer";
import { TaskPriorityInitializer } from "@/features/tasks/helper/TaskPriorityInitializer";
import { TaskStatusInitializer } from "@/features/tasks/helper/TaskStatusInitializer";

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
          <ProjectStatusInitializer />
          <ProjectPriorityInitializer />
          <TaskStatusInitializer />
          <TaskPriorityInitializer />
          {children}
          <Toaster position="top-center" />
        </ZustendProviders>
      </ThemeProvider>
    </>
  );
}
