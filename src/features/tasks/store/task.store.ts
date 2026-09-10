import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Task } from "../types/task";

interface TaskStore {
    tasks: Task[];

    addTask: (task: Task) => void;
    removeTask: (id: string) => void;
    updateTask: (id: string, task: Partial<Task>) => void;
    getTaskById: (id: string) => Task | undefined;
    getTasksByProjectId: (projectId: string) => Task[];
    getTasksByUserId: (userId: string) => Task[];
}

export const useTaskStore = create<TaskStore>()(
    devtools(
        persist<TaskStore>(
            (set, get) => ({
                tasks: [],

                addTask: (task) =>
                    set((state) => ({
                        tasks: [...state.tasks, task],
                    })),

                removeTask: (id) =>
                    set((state) => ({
                        tasks: state.tasks.filter(
                            (task) => task.id !== id
                        ),
                    })),

                updateTask: (id, updatedTask) =>
                    set((state) => ({
                        tasks: state.tasks.map((task) =>
                            task.id === id
                                ? { ...task, ...updatedTask }
                                : task
                        ),
                    })),

                getTaskById: (id) =>
                    get().tasks.find(
                        (task) => task.id === id
                    ),


                getTasksByProjectId: (projectId) =>
                    get().tasks.filter(
                        (task) => task.projectId === projectId
                    ),


                getTasksByUserId: (userId) =>
                    get().tasks.filter(
                        (task) => task.userId === userId
                    ),
            }),
            {
                name: "tasks-storage",
                skipHydration: true,
            }
        )
    )
);