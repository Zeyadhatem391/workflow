"use client";

import { useProjectStatusStore } from "@/features/projects/store/statusProject.store";

import { useProjectPriorityStore } from "@/features/projects/store/priorityProject.store";
import { CategoryTable } from "./CategoryTable";
import { generateId } from "../utils/generateId";
import { useActivityStore } from "@/features/activity/store/activity.store";
import { getCurrentUser } from "@/features/auth/helper/auth";

export default function ProjectCategorySection() {
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

  const projectStatus = useProjectStatusStore((state) => state.statuses);

  const addStatus = useProjectStatusStore((state) => state.addStatus);

  const removeStatus = useProjectStatusStore((state) => state.removeStatus);

  const updateStatus = useProjectStatusStore((state) => state.updateStatus);

  const getStatusById = useProjectStatusStore((state) => state.getStatusById);

  const projectPriorities = useProjectPriorityStore(
    (state) => state.priorities,
  );

  const addPriority = useProjectPriorityStore((state) => state.addPriority);

  const removePriority = useProjectPriorityStore(
    (state) => state.removePriority,
  );

  const updatePriority = useProjectPriorityStore(
    (state) => state.updatePriority,
  );

  const getPriorityById = useProjectPriorityStore(
    (state) => state.getPriorityById,
  );

  const addActivity = useActivityStore((state) => state.addActivity);

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
            description: `The project status has been successfully created.`,
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
            description: `The project status has been successfully deleted.`,
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
            description: `The project status has been successfully updated.`,
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
        title="Project Priority"
        description="Manage the available priorities for your projects."
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
            description: `The project priority has been successfully created.`,
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
            description: `The project priority has been successfully deleted.`,
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
            description: `The project priority has been successfully updated.`,
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
