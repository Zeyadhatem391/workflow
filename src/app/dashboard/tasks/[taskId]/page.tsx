"use client";

import { useParams } from "next/navigation";
import {
  CalendarDays,
  Clock,
  FolderKanban,
  Pencil,
  Trash2,
  User,
  UserRoundCheck,
} from "lucide-react";
import { useTaskStore } from "@/features/tasks/store/task.store";
import { formatDateTime } from "@/shared/components/FormatDate";
import { useProjectStore } from "@/features/projects/store/project.store";
import { useUserStore } from "@/features/auth/store/register.store";

function Page() {
  const params = useParams<{ taskId: string }>();

  const getTaskById = useTaskStore((state) => state.getTaskById);

  const task = getTaskById(params.taskId);

  const getProjectById = useProjectStore((state) => state.getProjectById);

  const getUserById = useUserStore((state) => state.getUserById);

  if (!task) {
    return <div>Task not found</div>;
  }
  const project = getProjectById(task.projectId);

  const user = getUserById(task.userId);

  const tasks = {
    assigneeId: "user-456",
    userId: "user-789",
  };

  const statusStyles: Record<string, string> = {
    todo: "bg-muted text-muted-foreground",
    "in-progress": "bg-status-info-bg text-status-info",
    review: "bg-status-warning-bg text-status-warning",
    done: "bg-status-success-bg text-status-success",
  };

  const priorityStyles: Record<string, string> = {
    low: "bg-status-success-bg text-status-success",
    medium: "bg-status-warning-bg text-status-warning",
    high: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="min-h-full p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="truncate text-2xl font-bold text-foreground sm:text-3xl capitalize">
            {task.title}
          </h1>
          <div className="flex w-full gap-2 sm:w-auto">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover sm:flex-none">
              <Pencil className="size-4" />
              Edit Task
            </button>

            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg  bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 sm:flex-none">
              <Trash2 className="size-4" />
              Delete
            </button>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <div className="rounded-xl border border-app-border bg-app-card p-5">
              <h2 className="text-base font-semibold text-foreground">
                Description
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {task.description}
              </p>
            </div>

            <div className="rounded-xl border border-app-border bg-app-card">
              <div className="border-b border-app-border p-5">
                <h2 className="font-semibold text-foreground">Task Details</h2>
              </div>

              <div className="grid grid-cols-1 divide-y divide-app-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="p-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Status
                  </p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      statusStyles[task.status] ??
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="p-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Priority
                  </p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      priorityStyles[task.priority] ??
                      "bg-status-warning-bg text-status-warning"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 divide-y divide-app-border border-t border-app-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="flex items-center gap-3 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-status-warning-bg text-status-warning">
                    <CalendarDays className="size-4" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Due Date</p>

                    <p className="mt-1 text-sm font-medium text-foreground">
                      {formatDateTime(task.dueDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-status-info-bg text-status-info">
                    <Clock className="size-4" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Created At</p>

                    <p className="mt-1 text-sm font-medium text-foreground">
                      {formatDateTime(task.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-app-border bg-app-card">
              <div className="border-b border-app-border p-5">
                <h2 className="font-semibold text-foreground">People</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Task creator and assignee
                </p>
              </div>

              <div className="space-y-5 p-5">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <User className="size-4" />
                    CREATED BY
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                      ZH
                    </div>

                    <p className="truncate text-sm font-semibold text-foreground">
                      {user?.name}
                    </p>
                  </div>
                </div>

                <div className="border-t border-app-border" />

                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <UserRoundCheck className="size-4" />
                    ASSIGNED TO
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-full bg-status-success text-sm font-semibold text-white">
                      JD
                    </div>

                    <p className="truncate text-sm font-semibold text-foreground">
                      Assigned User
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-app-border bg-app-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FolderKanban className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Project</p>

                  <p className="mt-1 truncate text-sm font-semibold text-foreground">
                    {project?.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
