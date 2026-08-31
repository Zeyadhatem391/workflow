"use client";

import { useDroppable } from "@dnd-kit/core";
import { Ellipsis, Plus } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  count: number;
  children: ReactNode;
}

function TaskColumn({ id, title, count, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div className="flex w-[280px] shrink-0 flex-col gap-3 sm:w-[290px]">
      {/* Header */}
      <div className="flex items-center justify-between rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="truncate text-base font-semibold text-gray-800 dark:text-zinc-100 sm:text-lg">
            {title}
          </span>

          <div className="flex h-6 min-w-6 items-center justify-center rounded-lg bg-gray-100 px-2 text-xs font-semibold text-gray-600 dark:bg-zinc-800 dark:text-zinc-300">
            {count}
          </div>
        </div>

        <div className="ml-2 flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="More options"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <Ellipsis className="h-4.5 w-4.5" />
          </button>

          <button
            type="button"
            aria-label="Add task"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-zinc-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={`min-h-[220px] rounded-xl border p-2 transition-all duration-200 sm:min-h-[250px] ${
          isOver
            ? "border-blue-300 bg-blue-50/70 shadow-inner dark:border-blue-500/40 dark:bg-blue-500/5"
            : "border-transparent bg-gray-50/50 dark:bg-zinc-950/30"
        }`}
      >
        <div className="flex min-h-[204px] flex-col gap-3 sm:min-h-[234px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default TaskColumn;
