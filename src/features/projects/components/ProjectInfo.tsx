"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  CirclePlus,
  ListTodo,
  Pencil,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatDate, formatDateTime } from "@/shared/components/FormatDate";

import { Project } from "../types/project";
import { Task } from "@/features/tasks/types/task";
import DeleteProjectDialog from "./DeleteProjectDialog";
import { calculateProjectProgress } from "../helper/calculateProjectProgress";
import { useUserStore } from "@/features/auth/store/register.store";
import Link from "next/link";

function ProjectInfo({ project, tasks }: { project: Project; tasks: Task[] }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const statusStyles: Record<string, string> = {
    active: "bg-status-success-bg text-status-success",
    completed: "bg-status-info-bg text-status-info",
    "on-hold": "bg-status-warning-bg text-status-warning",
    planning: "bg-muted text-muted-foreground",
  };

  const priorityStyles: Record<string, string> = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-status-warning-bg text-status-warning",
    low: "bg-muted text-muted-foreground",
  };

  const completedTasks = tasks.filter((task) => task.status === "done").length;

  const progress = calculateProjectProgress(tasks.length, completedTasks);

  const getUserById = useUserStore((state) => state.getUserById);

  const admin = getUserById(project.admin);

  return (
    <section className="rounded-2xl border p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-900  border-gray-200/70 bg-white">
      <div className="border-b border-gray-200 dark:border-gray-800 pb-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <h1 className="min-w-0 max-w-full truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {project.title}
              </h1>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  statusStyles[project.status] ??
                  "bg-muted text-muted-foreground"
                }`}
              >
                {project.status}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  priorityStyles[project.priority] ??
                  "bg-status-warning-bg text-status-warning"
                }`}
              >
                {project.priority}
              </span>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
              {project.description}
            </p>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <Link href={`/dashboard/projects/${project.id}/update`}>
              <Button
                size="sm"
                className="h-9 flex-1 cursor-pointer gap-1.5 rounded-lg sm:flex-none text-white"
              >
                <Pencil className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>

            <Button
              size="sm"
              className="h-9 flex-1 cursor-pointer gap-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover sm:flex-none"
            >
              <CirclePlus className="h-4 w-4" />
              <span>Add Task</span>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              className="h-9 flex-1 cursor-pointer gap-1.5 rounded-lg sm:flex-none bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>

            <DeleteProjectDialog
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              projectId={project.id}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-5 border-b border-gray-200 dark:border-gray-800 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="min-w-0">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground sm:text-[15px]">
              Project Progress
            </span>

            <span className="text-sm font-bold text-foreground">
              {progress}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:flex sm:gap-7">
          <div className="flex items-start gap-2">
            <ListTodo className="hidden h-5 w-5 text-muted-foreground sm:block" />

            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">Tasks</p>

              <p className="text-sm font-bold text-foreground sm:text-base">
                {tasks.length}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="hidden h-5 w-5 text-muted-foreground sm:block" />

            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Completed
              </p>

              <p className="text-sm font-bold text-foreground sm:text-base">
                {completedTasks}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Users className="hidden h-5 w-5 text-muted-foreground sm:block" />

            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Members
              </p>

              <p className="text-sm font-bold text-foreground sm:text-base">
                {project.members}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-5 py-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex min-w-0 items-start gap-3">
          <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="mb-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
              Start Date
            </p>

            <p className="truncate text-sm font-semibold text-foreground sm:text-[15px]">
              {formatDateTime(project.startDate)}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="mb-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
              Due Date
            </p>

            <p className="truncate text-sm font-semibold text-foreground sm:text-[15px]">
              {formatDateTime(project.dueDate)}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="mb-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
              Admin
            </p>

            <p className="truncate text-sm font-semibold capitalize text-foreground sm:text-[15px]">
              {admin?.name}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <Users className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium text-muted-foreground sm:text-sm">
              Team
            </p>

            <div className="flex -space-x-2">
              {project.membersList?.slice(0, 4).map((member, index) => (
                <div
                  key={`${member}-${index}`}
                  title={member}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-status-info-bg text-[10px] font-bold text-status-info"
                >
                  {member.charAt(0).toUpperCase()}
                </div>
              ))}

              {project.members > 4 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-muted text-[10px] font-bold text-muted-foreground">
                  +{project.members - 4}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 text-xs text-muted-foreground sm:text-sm">
        Created : {formatDate(project.createdAt)}
      </div>
    </section>
  );
}

export default ProjectInfo;
