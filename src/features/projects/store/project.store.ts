import { create } from "zustand";
import { Project } from "../types/project";
import { devtools, persist } from "zustand/middleware";

interface ProjectStore {
    projects: Project[];

    addProject: (project: Project) => void;
    removeProject: (id: string) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    getProjectById: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>()(
    devtools(
        persist<ProjectStore>(
            (set, get) => ({
                projects: [],

                addProject: (project) =>
                    set((state) => ({
                        projects: [...state.projects, project],
                    })),

                removeProject: (id) =>
                    set((state) => ({
                        projects: state.projects.filter(
                            (project) => project.id !== id
                        ),
                    })),

                updateProject: (id, updatedProject) =>
                    set((state) => ({
                        projects: state.projects.map((project) =>
                            project.id === id
                                ? { ...project, ...updatedProject }
                                : project
                        ),
                    })),

                getProjectById: (id) =>
                    get().projects.find(
                        (project) => project.id === id
                    ),
            }),
            {
                name: "projects-storage",
                  skipHydration: true,
            }
        )
    )
);