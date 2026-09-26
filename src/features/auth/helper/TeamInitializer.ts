"use client";

import { useEffect } from "react";
import { useUserStore } from "../store/register.store";

export function TeamInitializer() {
    useEffect(() => {
        const initialize = async () => {
            await useUserStore.persist.rehydrate();
            useUserStore.getState().initializeTeam();
        };

        initialize();
    }, []);

    return null;
}