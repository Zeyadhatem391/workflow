"use client";

import { useEffect } from "react";
import { useTaskStatusStore } from "../store/statusTasks.store";

export function TaskStatusInitializer() {
    const initializeStatuses =
        useTaskStatusStore(
            (state) => state.initializeStatuses
        );

    useEffect(() => {
        useTaskStatusStore.persist.rehydrate();

        initializeStatuses();
    }, [initializeStatuses]);

    return null;
}