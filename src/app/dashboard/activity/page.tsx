"use client";

import ActivityItem from "@/features/activity/components/ActivityItem";
import { groupActivitiesByDate } from "@/features/activity/data/activity";
import { useActivityStore } from "@/features/activity/store/activity.store";
import { getCurrentUser } from "@/features/auth/helper/auth";
import { formatActivityDate } from "@/shared/components/FormatDate";

import { CalendarDays } from "lucide-react";

function Page() {
  const user = getCurrentUser();

  if (!user) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-muted-foreground">
          User information is not available.
        </p>
      </div>
    );
  }

  const getActivitiesByUserId = useActivityStore(
    (state) => state.getActivitiesByUserId,
  );

  const activities = getActivitiesByUserId(user.id);

  const groupedActivities = groupActivitiesByDate(activities);

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Activity
        </h1>

        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Track all your activities in one place.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10">
        {Object.entries(groupedActivities).map(([date, dateActivities]) => (
          <section key={date} className="space-y-4">
            <div className="flex justify-between items-center gap-2 rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900 sm:p-5">
              <div className="flex items-center gap-2">
                <div className="bg-blue-400/20 rounded-full p-3">
                  <CalendarDays className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-sm font-bold text-foreground">
                  {formatActivityDate(date)}
                </h2>
              </div>

              <p className="text-[11px] text-muted-foreground">
                {dateActivities.length}{" "}
                {dateActivities.length === 1 ? "activity" : "activities"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
              {dateActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Page;
