"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CalendarDays, Clock3, User } from "lucide-react";
import Link from "next/link";

import { Task } from "../types/task";

interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityStyles: Record<string, string> = {
    low: "bg-green-500/10 text-green-600 dark:bg-green-500/10 dark:text-green-400",
    medium:
      "bg-orange-500/10 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    high: "bg-red-500/10 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  };

  return (
    <Link
      href={`/dashboard/tasks/${task.id}`}
      className="block w-full"
      onClick={(event) => {
        // Prevent opening the task when dragging
        if (isDragging) {
          event.preventDefault();
        }
      }}
    >
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`
          group w-full cursor-grab rounded-xl
          border border-gray-200
          bg-white p-4
          shadow-sm
          transition-all duration-200
          active:cursor-grabbing
          hover:-translate-y-0.5 hover:shadow-md
          dark:border-zinc-800
          dark:bg-zinc-900
          dark:hover:border-zinc-700
          dark:hover:shadow-black/20
          ${isDragging ? "opacity-40 shadow-lg" : ""}
        `}
      >
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 line-clamp-2 text-sm font-semibold leading-5 text-gray-900 dark:text-white">
            {task.title}
          </h3>

          <span
            className={`
              shrink-0 rounded-full
              px-2.5 py-1
              text-[11px] font-semibold capitalize
              ${
                priorityStyles[task.priority] ??
                "bg-gray-500/10 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400"
              }
            `}
          >
            {task.priority}
          </span>
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-xs leading-5 text-gray-500 dark:text-zinc-400 sm:text-sm">
          {task.description}
        </p>

        {/* Due Date */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400">
          <CalendarDays className="h-4 w-4 shrink-0 text-gray-400 dark:text-zinc-500" />

          <span className="truncate">
            Due{" "}
            <span className="font-medium text-gray-700 dark:text-zinc-300">
              {task.dueDate}
            </span>
          </span>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-zinc-800">
          {/* Assignee */}
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <User className="h-3.5 w-3.5" />
            </div>

            <span className="truncate text-xs font-medium text-gray-600 dark:text-zinc-300">
              {task.assigneeId}
            </span>
          </div>

          {/* Time icon */}
          <Clock3 className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-blue-600 dark:text-zinc-500 dark:group-hover:text-blue-400" />
        </div>
      </div>
    </Link>
  );
}

export default TaskCard;
