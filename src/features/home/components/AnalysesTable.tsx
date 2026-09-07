"use client";

import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { useProjectStore } from "@/features/projects/store/project.store";
import { useTaskStore } from "@/features/tasks/store/task.store";
import Link from "next/link";
import { formatDate, getRemainingTime } from "@/shared/components/FormatDate";

function AnalysesTable() {
  const projects = useProjectStore((state) => state.projects);
  const tasks = useTaskStore((state) => state.tasks);

  const getStatusStyle = (status: string) => {
    const styles: Record<string, string> = {
      planning: "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300",
      active: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
      "in-progress":
        "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
      completed:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
      done: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
      review:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
      todo: "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300",
      "on-hold":
        "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
    };

    return (
      styles[status] ??
      "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300"
    );
  };

  const getPriorityStyle = (priority: string) => {
    const styles: Record<string, string> = {
      low: "text-emerald-600 dark:text-emerald-400",
      medium: "text-amber-600 dark:text-amber-400",
      high: "text-red-600 dark:text-red-400",
    };

    return styles[priority] ?? "text-muted-foreground";
  };

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-gray-200/70 p-4 dark:border-zinc-800 sm:p-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Recent Projects
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Overview of your latest projects
            </p>
          </div>
          <Link href="/dashboard/projects">
            <button
              type="button"
              className="flex items-center gap-1 cursor-pointer text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>
        <div className="divide-y divide-gray-200/70 dark:divide-zinc-800">
          {projects.slice(0, 5).map((project) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5 cursor-pointer dark:hover:bg-gray-300/10 hover:bg-gray-800/10">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {project.title}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${getStatusStyle(
                        project.status,
                      )}`}
                    >
                      {project.status.replace("-", " ")}
                    </span>

                    <span
                      className={`text-[11px] font-medium capitalize ${getPriorityStyle(
                        project.priority,
                      )}`}
                    >
                      {project.priority}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 items-center gap-1.5 text-xs text-muted-foreground flex">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(project.dueDate)}
                </div>
              </div>
            </Link>
          ))}

          {projects.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-muted-foreground">
              No projects available.
            </div>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-gray-200/70 p-4 dark:border-zinc-800 sm:p-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Recent Tasks
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Keep track of your latest tasks
            </p>
          </div>
          <Link href="/dashboard/tasks">
            <button
              type="button"
              className="flex items-center gap-1 cursor-pointer text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>

        <div className="divide-y divide-gray-200/70 dark:divide-zinc-800">
          {tasks.slice(0, 5).map((task) => (
            <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
              <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5 cursor-pointer dark:hover:bg-gray-300/10 hover:bg-gray-800/10">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground capitalize">
                    {task.title}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${getStatusStyle(
                        task.status,
                      )}`}
                    >
                      {task.status.replace("-", " ")}
                    </span>

                    <span
                      className={`text-[11px] font-medium capitalize ${getPriorityStyle(
                        task.priority,
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 items-center gap-1.5 text-xs text-muted-foreground flex">
                  <Clock3 className="h-3.5 w-3.5" />
                  {getRemainingTime(task.dueDate)}
                </div>
              </div>
            </Link>
          ))}

          {tasks.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-muted-foreground">
              No tasks available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalysesTable;
