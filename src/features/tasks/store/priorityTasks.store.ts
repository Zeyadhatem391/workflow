import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface TasksPriority {
    id: string;
    name: string;
}

const defaultTasksPriorities: TasksPriority[] = [
    {
        id: "low",
        name: "Low",
    },
    {
        id: "medium",
        name: "Medium",
    },
    {
        id: "high",
        name: "High",
    },
];

interface TasksPriorityStore {
    priorities: TasksPriority[];

    addPriority: (priority: TasksPriority) => void;

    updatePriority: (
        id: string,
        updatedPriority: Partial<TasksPriority>
    ) => void;



    removePriority: (id: string) => void;

    getPriorityById: (id: string) => TasksPriority | undefined;

    initializePriorities: () => void;
}

export const useTasksPriorityStore =
    create<TasksPriorityStore>()(
        devtools(
            persist(
                (set, get) => ({
                    priorities: [],

                    addPriority: (priority) =>
                        set((state) => ({
                            priorities: [
                                ...state.priorities,
                                priority,
                            ],
                        })),

                    updatePriority: (id, updatedPriority) =>
                        set((state) => ({
                            priorities: state.priorities.map(
                                (priority) =>
                                    priority.id === id
                                        ? {
                                            ...priority,
                                            ...updatedPriority,
                                        }
                                        : priority
                            ),
                        })),

                    removePriority: (id) =>
                        set((state) => ({
                            priorities: state.priorities.filter(
                                (priority) =>
                                    priority.id !== id
                            ),
                        })),

                    getPriorityById: (id) =>
                        get().priorities.find((priority) => priority.id === id),

                    initializePriorities: () => {
                        if (get().priorities.length === 0) {
                            set({
                                priorities: defaultTasksPriorities,
                            });
                        }
                    },
                }),
                {
                    name: "task-priority-storage",
                    skipHydration: true,
                }
            )
        )
    );