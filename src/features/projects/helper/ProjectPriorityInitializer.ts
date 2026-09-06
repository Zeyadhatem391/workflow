"use client";

import { useEffect } from "react";
import { useProjectPriorityStore } from "../store/priorityProject.store";

export function ProjectPriorityInitializer() {
  const initializePriorities = useProjectPriorityStore(
    (state) => state.initializePriorities
  );

  useEffect(() => {
    useProjectPriorityStore.persist.rehydrate();

    initializePriorities();
  }, [initializePriorities]);

  return null;
}