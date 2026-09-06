import { Plus } from "lucide-react";

type CategoryTableHeaderProps = {
  title: string;
  description: string;
  addLabel: string;

  onAddClick: () => void;
};

export function CategoryTableHeader({
  title,
  description,
  addLabel,
  onAddClick,
}: CategoryTableHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 p-4 dark:border-zinc-800 sm:p-5">
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>

        <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onAddClick}
        className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        <Plus className="h-4 w-4" />

        <span className="hidden sm:inline">{addLabel}</span>
      </button>
    </div>
  );
}
