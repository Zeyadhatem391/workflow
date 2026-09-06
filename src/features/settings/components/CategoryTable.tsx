"use client";

import { useState } from "react";

import { CategoryDialog } from "./CategoryDialog";
import { CategoryTableHeader } from "./CategoryTableHeader";
import { CategoryTableRow } from "./CategoryTableRow";

import {
  CategoryItem,
  CategoryTableProps,
} from "../types/category";

export function CategoryTable({
  title,
  description,
  addLabel,
  data,
  onAdd,
  onDelete,
  onUpdate,
}: CategoryTableProps) {
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editedName, setEditedName] =
    useState("");

  const [isAddDialogOpen, setIsAddDialogOpen] =
    useState(false);

  const handleEdit = (item: CategoryItem) => {
    setEditingId(item.id);
    setEditedName(item.name);
  };

  const handleSave = (id: string) => {
    const name = editedName.trim();

    if (!name) return;

    onUpdate?.(id, name);

    setEditingId(null);
    setEditedName("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedName("");
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <CategoryTableHeader
          title={title}
          description={description}
          addLabel={addLabel}
          onAddClick={() =>
            setIsAddDialogOpen(true)
          }
        />

        {/* Table */}
        <div className="w-full">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-950/40">
                <th className="w-[18%] px-3 py-3 text-left font-medium text-muted-foreground sm:w-[15%] sm:px-5">
                  ID
                </th>

                <th className="px-3 py-3 text-left font-medium text-muted-foreground sm:px-5">
                  Name
                </th>

                <th className="w-[25%] px-3 py-3 text-right font-medium text-muted-foreground sm:w-[20%] sm:px-5">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <CategoryTableRow
                    key={item.id}
                    item={item}
                    index={index}
                    isEditing={
                      editingId === item.id
                    }
                    editedName={editedName}
                    hasUpdate={!!onUpdate}
                    onEdit={() =>
                      handleEdit(item)
                    }
                    onChange={setEditedName}
                    onSave={() =>
                      handleSave(item.id)
                    }
                    onCancel={
                      handleCancelEdit
                    }
                    onDelete={
                      onDelete
                        ? () =>
                            onDelete(item.id)
                        : undefined
                    }
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-8 text-center text-sm text-muted-foreground"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Dialog */}
      {onAdd && (
        <CategoryDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          title={title}
          description={description}
          addLabel={addLabel}
          existingData={data}
          onSubmit={onAdd}
        />
      )}
    </>
  );
}