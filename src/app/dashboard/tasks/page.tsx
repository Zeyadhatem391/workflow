import { Button } from "@/components/ui/button";
import TaskBoard from "@/features/tasks/components/TaskBoard";
import { Plus } from "lucide-react";
import Link from "next/link";

function Page() {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Tasks
          </h1>

          <p className="mt-1 text-sm leading-5 text-muted-foreground sm:text-[15px]">
            Manage and track all your tasks in one place.
          </p>
        </div>

        <Link href="/dashboard/tasks/add" className="w-full sm:w-auto">
          <Button
            className="
              h-10 w-full cursor-pointer gap-2 rounded-lg
              bg-blue-700 px-4 text-white
              shadow-sm transition-all
              hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-md
              dark:bg-blue-600 dark:hover:bg-blue-700
              sm:w-auto
            "
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
        </Link>
      </div>

      {/* Task Board */}
      <div className="min-w-0">
        <TaskBoard />
      </div>
    </div>
  );
}

export default Page;
