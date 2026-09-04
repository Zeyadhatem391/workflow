"use client";

import {
  Pencil,
  Plus,
  Trash2,
  ClipboardList,
  PlayCircle,
  CheckCircle2,
  PauseCircle,
  ArrowDown,
  Minus,
  ArrowUp,
} from "lucide-react";

const projectStatuses = [
  {
    id: 1,
    name: "Planning",
    value: "planning",
    icon: ClipboardList,
  },
  {
    id: 2,
    name: "Active",
    value: "active",
    icon: PlayCircle,
  },
  {
    id: 3,
    name: "Completed",
    value: "completed",
    icon: CheckCircle2,
  },
  {
    id: 4,
    name: "On Hold",
    value: "on-hold",
    icon: PauseCircle,
  },
];

const projectPriorities = [
  {
    id: 1,
    name: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    id: 2,
    name: "Medium",
    value: "medium",
    icon: Minus,
  },
  {
    id: 3,
    name: "High",
    value: "high",
    icon: ArrowUp,
  },
];

type CategoryItem = {
  id: number;
  name: string;
  value: string;
  icon: React.ElementType;
};

type CategoryTableProps = {
  title: string;
  description: string;
  addLabel: string;
  data: CategoryItem[];
};

function CategoryTable({
  title,
  description,
  addLabel,
  data,
}: CategoryTableProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 p-4 dark:border-zinc-800 sm:p-5">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>

          <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
            {description}
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">{addLabel}</span>
        </button>
      </div>

      <div className="w-full">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-950/40">
              <th className="w-[18%] px-3 py-3 text-left font-medium text-muted-foreground sm:w-[15%] sm:px-5">
                ID
              </th>

              <th className="px-3 py-3 text-left font-medium text-muted-foreground sm:px-5">
                Name
              </th>

              <th className="w-[25%] px-3 py-3 text-right font-medium text-muted-foreground sm:w-[20%] sm:px-5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              const Icon = item.icon;

              return (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 last:border-0 dark:border-zinc-800/70"
                >
                  <td className="px-3 py-3 text-left text-xs font-medium text-muted-foreground sm:px-5 sm:text-sm">
                    #{item.id}
                  </td>

                  <td className="px-3 py-3 sm:px-5">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      <span className="truncate text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-3 sm:px-5">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        aria-label={`Edit ${item.name}`}
                        title={`Edit ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        aria-label={`Delete ${item.name}`}
                        title={`Delete ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProjectCategorySection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Project Categories
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your project statuses and priorities.
        </p>
      </div>

      <CategoryTable
        title="Project Status"
        description="Manage the available statuses for your projects."
        addLabel="Add Status"
        data={projectStatuses}
      />

      <CategoryTable
        title="Project Priority"
        description="Manage the available priorities for your projects."
        addLabel="Add Priority"
        data={projectPriorities}
      />
    </div>
  );
}

export default ProjectCategorySection;
