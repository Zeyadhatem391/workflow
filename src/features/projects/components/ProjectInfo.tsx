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

function ProjectInfo({ project, tasks }: { project: Project; tasks: Task[] }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const statusStyles = {
    active: "bg-green-500/10 text-green-600 dark:text-green-400",
    completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    "on-hold": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    planning: "bg-muted text-muted-foreground",
  };

  const priorityStyles = {
    high: "bg-red-500/10 text-red-600 dark:text-red-400",
    medium: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          {/* Project Info */}
          <div className="min-w-0 flex-1">
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <h1 className="min-w-0 max-w-full truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {project.title}
              </h1>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  statusStyles[project.status]
                }`}
              >
                {project.status}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  priorityStyles[project.priority]
                }`}
              >
                {project.priority}
              </span>
            </div>

            <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
              {project.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="h-9 flex-1 cursor-pointer gap-1.5 rounded-lg sm:flex-none"
            >
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </Button>

            <Button
              size="sm"
              className="h-9 flex-1 cursor-pointer gap-1.5 rounded-lg bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 sm:flex-none"
            >
              <CirclePlus className="h-4 w-4" />
              <span>Add Task</span>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              className="h-9 flex-1 cursor-pointer gap-1.5 rounded-lg sm:flex-none"
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

      {/* Progress + Stats */}
      <div className="grid gap-5 border-b border-border py-5 lg:grid-cols-[1fr_auto] lg:items-center">
        {/* Progress */}
        <div className="min-w-0">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground sm:text-[15px]">
              Project Progress
            </span>

            <span className="text-sm font-bold text-foreground">
              {project.progress}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-blue-700 transition-all duration-500 dark:bg-blue-500"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>
        </div>

        {/* Stats */}
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
                {tasks.filter((task) => task.status === "done").length}
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

      {/* Project Details */}
      <div className="grid gap-5 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Start Date */}
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

        {/* Due Date */}
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

        {/* Admin */}
        <div className="flex min-w-0 items-start gap-3">
          <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="mb-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
              Admin
            </p>

            <p className="truncate text-sm font-semibold capitalize text-foreground sm:text-[15px]">
              {project.admin}
            </p>
          </div>
        </div>

        {/* Team */}
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
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400"
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

      {/* Created */}
      <div className="border-t border-border pt-4 text-xs text-muted-foreground sm:text-sm">
        Created {formatDate(project.createdAt)}
      </div>
    </section>
  );
}

export default ProjectInfo;
