"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TaskActivity } from "../../data/chart";

interface TaskActivityChartProps {
  data: TaskActivity[];
}

export default function TaskActivityChart({ data }: TaskActivityChartProps) {
  return (
    <div className="h-full rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900 sm:p-5 lg:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Task Activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Overview of your task activity throughout the year
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-blue-500" />
            <span className="text-muted-foreground">Created</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Completed</span>
          </div>
        </div>
      </div>

      <div className="h-[260px] w-full sm:h-[300px] lg:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 4,
              left: -20,
              bottom: 0,
            }}
            barGap={4}
            barCategoryGap="25%"
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              className="stroke-slate-100 dark:stroke-zinc-800"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
              }}
              tickMargin={10}
              interval="preserveStartEnd"
              className="fill-muted-foreground"
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
              }}
              width={35}
              allowDecimals={false}
              className="fill-muted-foreground"
            />

            <Tooltip
              cursor={{
                fill: "rgba(148, 163, 184, 0.08)",
              }}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--background))",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              }}
              labelStyle={{
                fontWeight: 600,
                marginBottom: 4,
              }}
            />

            <Bar
              dataKey="created"
              name="Created Tasks"
              fill="#3B82F6"
              radius={[5, 5, 0, 0]}
              barSize={10}
            />

            <Bar
              dataKey="completed"
              name="Completed Tasks"
              fill="#10B981"
              radius={[5, 5, 0, 0]}
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
