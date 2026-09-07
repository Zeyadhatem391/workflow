import type { LucideIcon } from "lucide-react";

interface StatisticsCardProps {
  id: string;
  name: string;
  value: number;
  icon: LucideIcon;
  iconClassName: string;
  iconBgClassName: string;
}

function StatisticsCard({
  id,
  name,
  value,
  icon: Icon,
  iconClassName,
  iconBgClassName,
}: StatisticsCardProps) {
  return (
    <div
      key={id}
      className="rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900 sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBgClassName}`}
          >
            <Icon className={`h-5 w-5 ${iconClassName}`} />
          </div>

          <p className="truncate text-sm font-medium text-muted-foreground">
            {name}
          </p>
        </div>

        <p className="block text-2xl font-bold tracking-tight text-foreground lg:hidden">
          {value}
        </p>
      </div>

      <p className="mt-4 hidden text-2xl font-bold tracking-tight text-foreground lg:block">
        {value}
      </p>
    </div>
  );
}

export default StatisticsCard;
