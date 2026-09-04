import {
  CalendarDays,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  Users,
} from "lucide-react";
import { Project } from "../types/project";

import { formatDate } from "@/shared/components/FormatDate";
import Link from "next/link";
import { useTaskStore } from "@/features/tasks/store/task.store";

interface Props {
  project: Project;
}

function ProjectCard({ project }: Props) {
  const statusStyles = {
    planning:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
    active:
      "bg-green-500/10 text-green-600 dark:bg-green-400/10 dark:text-green-400",
    completed:
      "bg-purple-500/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400",
    "on-hold":
      "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400",
  };

  const priorityStyles = {
    low: "bg-slate-500/10 text-slate-600 dark:bg-slate-400/10 dark:text-slate-400",
    medium:
      "bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",
    high: "bg-red-500/10 text-red-600 dark:bg-red-400/10 dark:text-red-400",
  };

  const tasks = useTaskStore((state) => state.tasks);

  return (
    <Link href={`/dashboard/projects/${project.id}`} className="block h-full">
      <div
        className="
          group flex h-full flex-col
          rounded-2xl border border-gray-200/70
          bg-white p-4 shadow-sm
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg
          
          sm:p-5

          dark:border-zinc-800
          dark:bg-zinc-900
          dark:hover:border-zinc-700
          dark:hover:shadow-black/20
        "
      >
        <div className="min-w-0">
          <h2
            className="
              truncate text-base font-semibold
              text-gray-900
              sm:text-lg
              dark:text-zinc-100
            "
          >
            {project.title}
          </h2>

          <p
            className="
              mt-1 line-clamp-2
              text-xs leading-5
              text-gray-500
              sm:text-sm sm:leading-6
              dark:text-zinc-400
            "
          >
            {project.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize sm:px-3 sm:text-xs ${
              statusStyles[project.status]
            }`}
          >
            {project.status}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize sm:px-3 sm:text-xs ${
              priorityStyles[project.priority]
            }`}
          >
            {project.priority} priority
          </span>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600 sm:text-sm dark:text-zinc-300">
              Progress
            </span>

            <span className="text-xs font-semibold text-gray-900 sm:text-sm dark:text-zinc-100">
              {project.progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 sm:h-2 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-blue-700 transition-all duration-500 dark:bg-blue-600"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
          <div className="rounded-xl bg-gray-50 p-2.5 sm:p-3 dark:bg-zinc-800/70">
            <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />

              <span className="text-[11px] sm:text-xs">Tasks</span>
            </div>

            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-zinc-100">
              {tasks.filter((task) => task.status === "done").length}/
              {tasks.length}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-2.5 sm:p-3 dark:bg-zinc-800/70">
            <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400">
              <Users className="h-4 w-4 shrink-0" />

              <span className="text-[11px] sm:text-xs">Members</span>
            </div>

            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-zinc-100">
              {project.members}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-4 dark:border-zinc-800">
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex min-w-0 items-center gap-2 text-gray-500 dark:text-zinc-400">
              <CalendarDays className="h-4 w-4 shrink-0" />

              <span>Start date</span>
            </div>

            <span className="shrink-0 font-medium text-gray-800 dark:text-zinc-200">
              {formatDate(project.startDate)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex min-w-0 items-center gap-2 text-gray-500 dark:text-zinc-400">
              <Clock3 className="h-4 w-4 shrink-0" />

              <span>Due date</span>
            </div>

            <span className="shrink-0 font-medium text-gray-800 dark:text-zinc-200">
              {formatDate(project.dueDate)}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-zinc-800">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400">
              <CircleUserRound className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] text-gray-400 dark:text-zinc-500">
                Admin
              </p>

              <p className="truncate text-xs font-medium text-gray-800 sm:text-sm dark:text-zinc-200">
                {project.admin}
              </p>
            </div>
          </div>

          {project.membersList && project.membersList.length > 0 && (
            <div className="flex shrink-0 -space-x-2">
              {project.membersList.slice(0, 3).map((member, index) => (
                <div
                  key={`${member}-${index}`}
                  title={member}
                  className="
                        flex h-7 w-7 items-center
                        justify-center rounded-full
                        border-2 border-white
                        bg-zinc-200
                        text-[10px] font-semibold
                        text-zinc-700
                        sm:h-8 sm:w-8
                        dark:border-zinc-900
                        dark:bg-zinc-700
                        dark:text-zinc-200
                      "
                >
                  {member.charAt(0).toUpperCase()}
                </div>
              ))}

              {project.membersList.length > 3 && (
                <div
                  className="
                      flex h-7 w-7 items-center
                      justify-center rounded-full
                      border-2 border-white
                      bg-gray-100
                      text-[10px] font-semibold
                      text-gray-600
                      sm:h-8 sm:w-8
                      dark:border-zinc-900
                      dark:bg-zinc-800
                      dark:text-zinc-300
                    "
                >
                  +{project.membersList.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
