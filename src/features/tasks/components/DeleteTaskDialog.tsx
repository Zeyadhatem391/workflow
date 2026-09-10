"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import { Activity } from "@/features/activity/types/activity";
import { useActivityStore } from "@/features/activity/store/activity.store";
import { useTaskStore } from "../store/task.store";
import { getCurrentUser } from "@/features/auth/helper/auth";

interface DeleteTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
}

function DeleteTaskDialog({
  open,
  onOpenChange,
  taskId,
}: DeleteTaskDialogProps) {
  const router = useRouter();
  const removeTask = useTaskStore((state) => state.removeTask);

  const addActivity = useActivityStore((state) => state.addActivity);

  const getTask = useTaskStore((state) => state.getTaskById);

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

  const task = getTask(taskId);

  if (!task) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-muted-foreground">error</p>
      </div>
    );
  }

  const handleDelete = () => {
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      type: "task-deleted",
      title: task.title,
      description: "The task has been successfully deleted.",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      date: new Date().toISOString(),
      userId: user.id,
    };

    addActivity(newActivity);
    removeTask(taskId);

    onOpenChange(false);
    router.push("/dashboard/tasks");
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl ring-0 border dark:border-zinc-800 dark:bg-zinc-900 border-gray-200/70 bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Are you sure you want to delete this task?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone. The task and its data will be
            permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer rounded-lg border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="cursor-pointer rounded-lg bg-red-800 text-white hover:bg-red-950"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTaskDialog;
