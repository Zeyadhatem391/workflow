"use client";

import { useEffect } from "react";
import { useTasksPriorityStore } from "../store/priorityTasks.store";

export function TaskPriorityInitializer() {
    const initializePriorities = useTasksPriorityStore(
        (state) => state.initializePriorities
    );

    useEffect(() => {
        useTasksPriorityStore.persist.rehydrate();

        initializePriorities();
    }, [initializePriorities]);

    return null;
}