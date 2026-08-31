"use client";

import { useEffect, useState } from "react";

import { useProjectStore } from "@/features/projects/store/project.store";
import { useTaskStore } from "@/features/tasks/store/task.store";

function ZustandProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      await Promise.all([
        useProjectStore.persist.rehydrate(),
        useTaskStore.persist.rehydrate(),
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