"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteProjectDialog from "./DeleteProjectDialog";

function ProjectButton({ id }: { id: string }) {
  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MoreHorizontal size={20} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={5}
          className="w-44 rounded-xl bg-white p-1"
        >
          <DropdownMenuItem
            className="cursor-pointer gap-2 rounded-lg"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit Project</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer gap-2 rounded-lg text-red-600 focus:bg-red-50 focus:text-red-600"
            onSelect={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Project</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteProjectDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        projectId={id}
      />
    </>
  );
}

export default ProjectButton;