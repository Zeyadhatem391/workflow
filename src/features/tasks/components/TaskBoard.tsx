"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useState } from "react";

import TaskCard from "./TaskCard";
import TaskColumn from "./TaskColumn";

import { useTaskStore } from "../store/task.store";

import { Task } from "../types/task";
import { useTaskStatusStore } from "../store/statusTasks.store";
import { getCurrentUser } from "@/features/auth/helper/auth";

function TaskBoard() {
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

  const getTasksByUserId = useTaskStore((state) => state.getTasksByUserId);

  const tasks = getTasksByUserId(user.id);

  const updateTask = useTaskStore((state) => state.updateTask);

  const taskStatus = useTaskStatusStore((state) => state.statuses);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleDragStart(event: DragEndEvent) {
    const task = tasks.find((task) => task.id === event.active.id);

    if (task) {
      setActiveTask(task);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const activeTaskId = active.id.toString();
    const overId = over.id.toString();

    const activeTask = tasks.find((task) => task.id === activeTaskId);

    if (!activeTask) return;

    const targetColumn = taskStatus.find((status) => status.id === overId);

    if (targetColumn) {
      if (activeTask.status === targetColumn.id) {
        return;
      }

      updateTask(activeTaskId, {
        status: targetColumn.id,
      });

      return;
    }

    const overTask = tasks.find((task) => task.id === overId);

    if (overTask) {
      if (activeTask.status === overTask.status) {
        return;
      }

      updateTask(activeTaskId, {
        status: overTask.status,
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="
          -mx-2
          overflow-x-auto
          px-2
          pb-4
          sm:mx-0
          sm:px-0
          scrollbar-thin
        "
      >
        <div className="flex min-w-max gap-3 sm:gap-4">
          {taskStatus.map((status) => {
            const columnTasks = tasks.filter(
              (task) => task.status === status.id,
            );

            return (
              <TaskColumn
                key={status.id}
                id={status.id}
                title={status.name}
                count={columnTasks.length}
              >
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </TaskColumn>
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="w-[280px] sm:w-[290px]">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default TaskBoard;
