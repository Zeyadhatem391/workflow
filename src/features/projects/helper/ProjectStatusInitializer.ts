"use client";

import { useEffect } from "react";
import { useProjectStatusStore } from "../store/statusProject.store";

export function ProjectStatusInitializer() {
    const initializeStatuses =
        useProjectStatusStore(
            (state) => state.initializeStatuses
        );

    useEffect(() => {
        useProjectStatusStore.persist.rehydrate();

        initializeStatuses();
    }, [initializeStatuses]);

    return null;
}