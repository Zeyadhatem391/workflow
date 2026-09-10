"use client";

import { useActivityStore } from "@/features/activity/store/activity.store";
import { getCurrentUser, logout } from "@/features/auth/helper/auth";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const addActivity = useActivityStore((state) => state.addActivity);

  const user = getCurrentUser();

  if (!user) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-muted-foreground">
          User information is not available.
        </p>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();

      addActivity({
        id: crypto.randomUUID(),
        type: "log-out",
        title: user?.name,
        description: `You have successfully logged out.`,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        date: new Date().toISOString(),
        userId: user.id,
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full px-3 py-2 text-left text-sm font-medium dark:hover:bg-gray-300/10 hover:bg-gray-100/10 cursor-pointer"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
