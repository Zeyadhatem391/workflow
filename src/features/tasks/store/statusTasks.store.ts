import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";


interface TaskStatus {
    id: string;
    name: string;
}

const defaultTaskStatuses: TaskStatus[] = [
    {
        id: "todo",
        name: "To Do",
    },
    {
        id: "in-progress",
        name: "In Progress",
    },
    {
        id: "review",
        name: "Review",
    },
    {
        id: "done",
        name: "Done",
    },
];

interface TaskStatusStore {
    statuses: TaskStatus[];

    addStatus: (status: TaskStatus) => void;

    updateStatus: (
        id: string,
        updatedStatus: Partial<TaskStatus>
    ) => void;

    removeStatus: (id: string) => void;

    getStatusById: (id: string) => TaskStatus | undefined;


    initializeStatuses: () => void;
}

export const useTaskStatusStore =
    create<TaskStatusStore>()(
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
                                statuses: defaultTaskStatuses,
                            });
                        }
                    },
                }),
                {
                    name: "task-status-storage",
                    skipHydration: true,
                }
            )
        )
    );