"use client";

import { CheckCircle2, Clock3, ListTodo } from "lucide-react";
import { useTaskStore } from "@/features/tasks/store/task.store";
import { calculateProjectProgress } from "@/features/projects/helper/calculateProjectProgress";
import { getCurrentUser } from "@/features/auth/helper/auth";

interface Detail {
  title: string;
  value: string;
}

interface PercentageProps {
  title?: string;
}

export default function Percentage({
  title = "Task Progress",
}: PercentageProps) {
  const user = getCurrentUser();

  if (!user) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-muted-foreground">
          Please log in to perform any activities.
        </p>
      </div>
    );
  }

  const getTasksByUserId = useTaskStore((state) => state.getTasksByUserId);

  const tasks = getTasksByUserId(user.id);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "done").length;

  const remainingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks > 0 ? calculateProjectProgress(totalTasks, completedTasks) : 0;

  const radius = 70;
  const stroke = 10;

  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const details: Detail[] = [
    {
      title: "Total Tasks",
      value: totalTasks.toString(),
    },
    {
      title: "Completed",
      value: completedTasks.toString(),
    },
    {
      title: "Remaining",
      value: remainingTasks.toString(),
    },
  ];

  return (
    <div className="h-full rounded-xl bg-white p-5 shadow-sm dark:bg-zinc-900 sm:p-6">
      <div className="mb-6">
        <p className="font-semibold text-foreground">{title}</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Track your overall task completion
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative h-52 w-52">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="currentColor"
              strokeWidth={stroke}
              fill="none"
              className="text-slate-100 dark:text-zinc-800"
            />

            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="currentColor"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-blue-600 transition-all duration-700 ease-out dark:text-blue-500"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                {progress}
              </span>

              <span className="mt-2 text-xl font-semibold text-muted-foreground">
                %
              </span>
            </div>

            <span className="mt-1 text-sm font-medium text-muted-foreground">
              Completed
            </span>
          </div>
        </div>

        <div className="mt-7 w-full space-y-1">
          {details.map((item, index) => (
            <div
              key={item.title}
              className={`flex items-center justify-between py-3 ${
                index !== details.length - 1
                  ? "border-b border-slate-100 dark:border-zinc-800"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2.5">
                {index === 0 && (
                  <ListTodo className="h-4 w-4 text-violet-500" />
                )}

                {index === 1 && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                )}

                {index === 2 && <Clock3 className="h-4 w-4 text-amber-500" />}

                <p className="text-sm text-muted-foreground">{item.title}</p>
              </div>

              <span className="text-sm font-semibold text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
