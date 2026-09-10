"use client";

import { useEffect, useState } from "react";

import { useProjectStore } from "@/features/projects/store/project.store";
import { useTaskStore } from "@/features/tasks/store/task.store";
import { useUserStore } from "@/features/auth/store/register.store";
import { useActivityStore } from "@/features/activity/store/activity.store";

function ZustandProviders({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      await Promise.all([
        useProjectStore.persist.rehydrate(),
        useTaskStore.persist.rehydrate(),
        useUserStore.persist.rehydrate(),
        useActivityStore.persist.rehydrate(),

      ]);

      setHydrated(true);
    };

    hydrate();
  }, []);

  if (!hydrated) {
    return null;
  }

  return children;
}

export default ZustandProviders;
