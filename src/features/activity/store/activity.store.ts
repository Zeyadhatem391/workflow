import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Activity } from "../types/activity";

interface ActivityStore {
    activities: Activity[];

    addActivity: (activity: Activity) => void;
    removeActivity: (id: string) => void;
    getActivitiesByUserId: (userId: string) => Activity[];
}

export const useActivityStore = create<ActivityStore>()(
    devtools(
        persist<ActivityStore>(
            (set, get) => ({
                activities: [],

                addActivity: (activity) =>
                    set((state) => ({
                        activities: [...state.activities, activity],
                    })),

                removeActivity: (id) =>
                    set((state) => ({
                        activities: state.activities.filter(
                            (activity) => activity.id !== id
                        ),
                    })),

                getActivitiesByUserId: (userId) =>
                    get().activities.filter(
                        (activity) => activity.userId === userId
                    ),
            }),
            {
                name: "activity-storage",
                skipHydration: true,
            }
        )
    )
);