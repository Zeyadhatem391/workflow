import { Project } from "../types/project";
import TaskCard from "@/features/tasks/components/TaskCard";
import { Task } from "@/features/tasks/types/task";

interface Props {
  project: Project;
  tasks: Task[];
}

function ProjectTasks({ project, tasks }: Props) {
  return (
    <section className="mt-5 w-full sm:mt-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
            Project Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
            Tasks assigned to{" "}
            <span className="font-medium text-gray-700 dark:text-zinc-200">
              {project.title}
            </span>
          </p>
        </div>

        <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-zinc-300 sm:text-sm">
          {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
        </span>
      </div>

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center dark:border-zinc-700 dark:bg-zinc-900/50 sm:py-10">
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300">
            No tasks found
          </p>

          <p className="mt-1 text-xs text-gray-400 dark:text-zinc-500">
            This project doesn&apos;t have any tasks yet.
          </p>
        </div>
      )}
    </section>
  );
}

export default ProjectTasks;