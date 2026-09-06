"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CategoryItem } from "../types/category";
import { generateId } from "../utils/generateId";

type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;
  addLabel: string;

  existingData: CategoryItem[];

  onSubmit: (name: string) => void;
};

export function CategoryDialog({
  open,
  onOpenChange,
  title,
  description,
  addLabel,
  existingData,
  onSubmit,
}: CategoryDialogProps) {
  const [name, setName] = useState("");

  const generatedId = generateId(name);

  const isDuplicate = existingData.some((item) => item.id === generatedId);

  const handleSubmit = () => {
    const trimmedName = name.trim();

    if (!trimmedName || !generatedId || isDuplicate) return;

    onSubmit(trimmedName);

    setName("");
    onOpenChange(false);
  };

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value);

    if (!value) {
      setName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-xl ring-0  bg-white  dark:bg-zinc-900 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add {title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="category-name"
            className="text-sm font-medium text-foreground"
          >
            Name
          </label>

          <Input
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder={`Enter ${title.toLowerCase()} name`}
             className="h-8 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim() || !generatedId || isDuplicate}
            className="text-white"
          >
            {addLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
