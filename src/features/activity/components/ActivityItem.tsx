import { ArrowRight, Clock } from "lucide-react";
import { activityConfig } from "../data/activity";
import { Activity } from "../types/activity";

type ActivityItemProps = {
  activity: Activity;
};

export default function ActivityItem({ activity }: ActivityItemProps) {
  const config = activityConfig[activity.type];
  const Icon = config.icon;

  const isDeleted =
    activity.type === "project-deleted" || activity.type === "task-deleted";

  return (
    <article className="group relative flex min-w-0 items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:-translate-y-0.5 sm:p-3.5 bg-white shadow-sm dark:bg-zinc-900 ">
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${config.className}`}
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className={`text-xs font-semibold ${
                isDeleted ? "text-destructive" : "text-foreground"
              }`}
            >
              {config.label}
            </p>

            <h3 className="mt-0.5 truncate text-sm font-semibold text-foreground">
              {activity.title}
            </h3>
          </div>

          <time className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="size-3" />

            <span>{activity.time}</span>
          </time>
        </div>

        <p className="mt-1 line-clamp-1 text-xs leading-5 text-muted-foreground">
          {activity.description}
        </p>

        {activity.status && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="rounded-md border bg-muted px-2 py-1 font-medium text-muted-foreground">
              {activity.status.from}
            </span>

            <ArrowRight className="size-3.5 text-muted-foreground" />

            <span className="rounded-md bg-status-info-bg px-2 py-1 font-medium text-status-info">
              {activity.status.to}
            </span>
          </div>
        )}
      </div>

      {isDeleted && (
        <span className="absolute bottom-0 left-3 right-3 h-px bg-destructive/40" />
      )}
    </article>
  );
}
