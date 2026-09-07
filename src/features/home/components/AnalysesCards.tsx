"use client";
import {
  CheckCircle2,
  FolderKanban,
  ListTodo,
  Layers3,
  CircleDot,
} from "lucide-react";

import StatisticsCard from "./StatisticsCard";
import { useTaskStore } from "@/features/tasks/store/task.store";
import { useProjectStore } from "@/features/projects/store/project.store";

function AnalysesCards() {
  const projects = useProjectStore((state) => state.projects).length;

  const tasks = useTaskStore((state) => state.tasks);

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const completedTasks = tasks.filter((task) => task.status === "done").length;
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-4">
      <StatisticsCard
        id="total-projects"
        name="Total Projects"
        value={projects}
        icon={FolderKanban}
        iconClassName="text-blue-600 dark:text-blue-400"
        iconBgClassName="bg-blue-50 dark:bg-blue-950/40"
      />
      <StatisticsCard
        id="total-tasks"
        name="Total Tasks"
        value={tasks.length}
        icon={ListTodo}
        iconClassName="text-violet-600 dark:text-violet-400"
        iconBgClassName="bg-violet-50 dark:bg-violet-950/40"
      />

      <StatisticsCard
        id="in-progress-tasks"
        name="In Progress Tasks"
        value={inProgressTasks}
        icon={CircleDot}
        iconClassName="text-amber-600 dark:text-amber-400"
        iconBgClassName="bg-amber-50 dark:bg-amber-950/40"
      />

      <StatisticsCard
        id="completed-tasks"
        name="Completed Tasks"
        value={completedTasks}
        icon={Layers3}
        iconClassName="text-orange-600 dark:text-orange-400"
        iconBgClassName="bg-orange-50 dark:bg-orange-950/40"
      />
    </div>
  );
}

export default AnalysesCards;
