"use client";

import { CategoryTable } from "./CategoryTable";
import { generateId } from "../utils/generateId";
import { useTasksPriorityStore } from "@/features/tasks/store/priorityTasks.store";
import { useTaskStatusStore } from "@/features/tasks/store/statusTasks.store";

export default function TaskCategorySection() {
  const projectStatus = useTaskStatusStore((state) => state.statuses);

  const addStatus = useTaskStatusStore((state) => state.addStatus);

  const removeStatus = useTaskStatusStore((state) => state.removeStatus);

  const updateStatus = useTaskStatusStore((state) => state.updateStatus);

  const projectPriorities = useTasksPriorityStore((state) => state.priorities);

  const addPriority = useTasksPriorityStore((state) => state.addPriority);

  const removePriority = useTasksPriorityStore((state) => state.removePriority);

  const updatePriority = useTasksPriorityStore((state) => state.updatePriority);

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
        onAdd={(name) =>
          addStatus({
            id: generateId(name),
            name,
          })
        }
        onDelete={removeStatus}
        onUpdate={(id, name) =>
          updateStatus(id, {
            name,
          })
        }
      />

      <CategoryTable
        title="Task Priority"
        description="Manage the available priorities for your tasks."
        addLabel="Add Priority"
        data={projectPriorities}
        onAdd={(name) =>
          addPriority({
            id: generateId(name),
            name,
          })
        }
        onDelete={removePriority}
        onUpdate={(id, name) =>
          updatePriority(id, {
            name,
          })
        }
      />
    </div>
  );
}
