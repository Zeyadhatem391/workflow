"use client";

import { CategoryTable } from "./CategoryTable";
import { generateId } from "../utils/generateId";
import { useTasksPriorityStore } from "@/features/tasks/store/priorityTasks.store";
import { useTaskStatusStore } from "@/features/tasks/store/statusTasks.store";
import { useActivityStore } from "@/features/activity/store/activity.store";
import { getCurrentUser } from "@/features/auth/helper/auth";

export default function TaskCategorySection() {
  const user = getCurrentUser();

  if (!user) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-muted-foreground">
          User information is not available.
        </p>
      </div>
    );
  }

  const projectStatus = useTaskStatusStore((state) => state.statuses);

  const addStatus = useTaskStatusStore((state) => state.addStatus);

  const removeStatus = useTaskStatusStore((state) => state.removeStatus);

  const updateStatus = useTaskStatusStore((state) => state.updateStatus);

  const getStatusById = useTaskStatusStore((state) => state.getStatusById);

  const projectPriorities = useTasksPriorityStore((state) => state.priorities);

  const addPriority = useTasksPriorityStore((state) => state.addPriority);

  const removePriority = useTasksPriorityStore((state) => state.removePriority);

  const updatePriority = useTasksPriorityStore((state) => state.updatePriority);

  const getPriorityById = useTasksPriorityStore(
    (state) => state.getPriorityById,
  );

  const addActivity = useActivityStore((state) => state.addActivity);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Task Categories
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your task statuses and priorities.
        </p>
      </div>

      <CategoryTable
        title="Task Status"
        description="Manage the available statuses for your tasks."
        addLabel="Add Status"
        data={projectStatus}
        onAdd={(name) => {
          addStatus({
            id: generateId(name),
            name,
          });

          addActivity({
            id: crypto.randomUUID(),
            type: "status-created",
            title: name,
            description: `The task status has been successfully created.`,
            time: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }),
            date: new Date().toISOString(),
            userId: user.id,
          });
        }}
        onDelete={(id) => {
          const status = getStatusById(id);

          if (!status) return;

          removeStatus(id);

          addActivity({
            id: crypto.randomUUID(),
            type: "status-deleted",
            title: status.name,
            description: `The task status has been successfully deleted.`,
            time: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }),
            date: new Date().toISOString(),
            userId: user.id,
          });
        }}
        onUpdate={(id, name) => {
          updateStatus(id, {
            name,
          });

          addActivity({
            id: crypto.randomUUID(),
            type: "status-updated",
            title: name,
            description: `The task status has been successfully updated.`,
            time: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }),
            date: new Date().toISOString(),
            userId: user.id,
          });
        }}
      />

      <CategoryTable
        title="Task Priority"
        description="Manage the available priorities for your tasks."
        addLabel="Add Priority"
        data={projectPriorities}
        onAdd={(name) => {
          addPriority({
            id: generateId(name),
            name,
          });

          addActivity({
            id: crypto.randomUUID(),
            type: "priority-created",
            title: name,
            description: `The task priority has been successfully created.`,
            time: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }),
            date: new Date().toISOString(),
            userId: user.id,
          });
        }}
        onDelete={(id) => {
          const priority = getPriorityById(id);

          if (!priority) return;

          removePriority(id);

          addActivity({
            id: crypto.randomUUID(),
            type: "priority-deleted",
            title: priority.name,
            description: `The task priority has been successfully deleted.`,
            time: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }),
            date: new Date().toISOString(),
            userId: user.id,
          });
        }}
        onUpdate={(id, name) => {
          updatePriority(id, {
            name,
          });

          addActivity({
            id: crypto.randomUUID(),
            type: "priority-updated",
            title: name,
            description: `The task priority has been successfully updated.`,
            time: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }),
            date: new Date().toISOString(),
            userId: user.id,
          });
        }}
      />
    </div>
  );
}
