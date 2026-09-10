import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";


interface ProjectStatus {
    id: string;
    name: string;
}

const defaultProjectStatuses: ProjectStatus[] = [
    {
        id: "planning",
        name: "Planning",
    },
    {
        id: "active",
        name: "Active",
    },
    {
        id: "completed",
        name: "Completed",
    },
    {
        id: "on-hold",
        name: "On Hold",
    },
];

interface ProjectStatusStore {
    statuses: ProjectStatus[];

    addStatus: (status: ProjectStatus) => void;

    updateStatus: (
        id: string,
        updatedStatus: Partial<ProjectStatus>
    ) => void;

    removeStatus: (id: string) => void;

    getStatusById: (id: string) => ProjectStatus | undefined;

    initializeStatuses: () => void;
}

export const useProjectStatusStore =
    create<ProjectStatusStore>()(
        devtools(
            persist(
                (set, get) => ({
                    statuses: [],

                    addStatus: (status) =>
                        set((state) => ({
                            statuses: [
                                ...state.statuses,
                                status,
                            ],
                        })),

                    updateStatus: (id, updatedStatus) =>
                        set((state) => ({
                            statuses: state.statuses.map(
                                (status) =>
                                    status.id === id
                                        ? {
                                            ...status,
                                            ...updatedStatus,
                                        }
                                        : status
                            ),
                        })),

                    removeStatus: (id) =>
                        set((state) => ({
                            statuses: state.statuses.filter(
                                (status) => status.id !== id
                            ),
                        })),

                    getStatusById: (id) =>
                        get().statuses.find((status) => status.id === id),


                    initializeStatuses: () => {
                        if (get().statuses.length === 0) {
                            set({
                                statuses: defaultProjectStatuses,
                            });
                        }
                    },
                }),
                {
                    name: "project-status-storage",
                    skipHydration: true,
                }
            )
        )
    );