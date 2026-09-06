"use client";

import { useProjectStatusStore } from "@/features/projects/store/statusProject.store";

import { useProjectPriorityStore } from "@/features/projects/store/priorityProject.store";
import { CategoryTable } from "./CategoryTable";
import { generateId } from "../utils/generateId";

export default function ProjectCategorySection() {
  const projectStatus = useProjectStatusStore((state) => state.statuses);

  const addStatus = useProjectStatusStore((state) => state.addStatus);

  const removeStatus = useProjectStatusStore((state) => state.removeStatus);

  const updateStatus = useProjectStatusStore((state) => state.updateStatus);

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
        title="Project Priority"
        description="Manage the available priorities for your projects."
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
