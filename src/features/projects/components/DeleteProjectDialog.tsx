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

import { useProjectStore } from "../store/project.store";
import { useRouter } from "next/navigation";

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

function DeleteProjectDialog({
  open,
  onOpenChange,
  projectId,
}: DeleteProjectDialogProps) {
  const router = useRouter();
  const removeProject = useProjectStore((state) => state.removeProject);

  const handleDelete = () => {
    removeProject(projectId);
    onOpenChange(false);
    router.push("/dashboard/projects");
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl ring-0 border dark:border-zinc-800 dark:bg-zinc-900 border-gray-200/70 bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Are you sure you want to delete this project?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone. The project and its data will be
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

export default DeleteProjectDialog;
