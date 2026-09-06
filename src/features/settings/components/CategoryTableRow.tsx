"use client";

import { Check, Pencil, Trash2 } from "lucide-react";

import { CategoryItem } from "../types/category";

type CategoryTableRowProps = {
  item: CategoryItem;
  index: number;

  isEditing: boolean;
  editedName: string;

  onEdit: () => void;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;

  onDelete?: () => void;

  hasUpdate?: boolean;
};

export function CategoryTableRow({
  item,
  index,
  isEditing,
  editedName,
  onEdit,
  onChange,
  onSave,
  onCancel,
  onDelete,
  hasUpdate,
}: CategoryTableRowProps) {
  return (
    <tr className="border-b border-gray-100 last:border-0 dark:border-zinc-800/70">
      {/* ID */}
      <td className="px-3 py-3 text-left text-xs font-medium text-muted-foreground sm:px-5 sm:text-sm">
        #{index + 1}
      </td>

      {/* Name */}
      <td className="px-3 py-3 sm:px-5">
        {isEditing ? (
          <input
            value={editedName}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave();
              }

              if (e.key === "Escape") {
                onCancel();
              }
            }}
            autoFocus
            className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
          />
        ) : (
          <span className="truncate text-sm font-medium text-foreground">
            {item.name}
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-3 py-3 sm:px-5">
        <div className="flex items-center justify-end gap-1.5">
          {hasUpdate && (
            <button
              type="button"
              onClick={isEditing ? onSave : onEdit}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-zinc-800"
            >
              {isEditing ? (
                <Check className="h-4 w-4" />
              ) : (
                <Pencil className="h-4 w-4" />
              )}
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              disabled={isEditing}
              onClick={onDelete}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
