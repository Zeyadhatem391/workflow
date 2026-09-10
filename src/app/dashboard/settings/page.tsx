"use client";

import { User, ListTodo, FolderKanban, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import TaskCategorySection from "@/features/settings/components/TaskCategorySection";
import ProjectCategorySection from "@/features/settings/components/ProjectCategorySection";
import ProfileSection from "@/features/settings/components/ProfileSection";
import { getCurrentUser } from "@/features/auth/helper/auth";
import InformationSection from "@/features/settings/components/InformationSection";

type SettingsTab = "profile" | "taskCategory" | "projectCategory" | "info";

const tabs = [
  {
    id: "profile" as const,
    label: "Profile",
    icon: User,
  },
  {
    id: "taskCategory" as const,
    label: "Task Category",
    icon: ListTodo,
  },
  {
    id: "projectCategory" as const,
    label: "Project Category",
    icon: FolderKanban,
  },
  {
    id: "info" as const,
    label: "Info",
    icon: Info,
  },
];

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const user = getCurrentUser();

  const tabParam = searchParams.get("tab");

  const activeTab: SettingsTab = tabs.some((tab) => tab.id === tabParam)
    ? (tabParam as SettingsTab)
    : "profile";

  const handleTabChange = (tab: SettingsTab) => {
    router.push(`/dashboard/settings?tab=${tab}`);
  };

  if (!user) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-muted-foreground">
          Please log in to perform any activities.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-5 shadow-sm dark:bg-zinc-900 sm:p-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your application settings
        </p>
      </div>
      <div className="border-t border-gray-200 pt-5 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-1 rounded-lg bg-gray-100 p-1 dark:bg-zinc-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                flex items-center gap-2 rounded-md px-4 py-2.5
                text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-white text-blue-700 shadow-sm dark:bg-zinc-900 dark:text-blue-400"
                    : "text-gray-600 hover:bg-white/70 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-900/70 dark:hover:text-zinc-100"
                }
              `}
                >
                  <Icon className="h-4 w-4 shrink-0" />

                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6 dark:border-zinc-800">
        {activeTab === "profile" && <ProfileSection />}

        {activeTab === "taskCategory" && <TaskCategorySection />}

        {activeTab === "projectCategory" && <ProjectCategorySection />}

        {activeTab === "info" && <InformationSection />}
      </div>
    </div>
  );
}

export default Page;
