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

type TaskStatus = "todo" | "in-progress" | "review" | "done";

const columns = [
  {
    id: "todo" as TaskStatus,
    title: "To Do",
  },
  {
    id: "in-progress" as TaskStatus,
    title: "In Progress",
  },
  {
    id: "review" as TaskStatus,
    title: "Review",
  },
  {
    id: "done" as TaskStatus,
    title: "Done",
  },
];

function TaskBoard() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleDragStart(event: DragEndEvent) {
    const task = tasks.find(
      (task) => task.id === event.active.id,
    );

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

    const activeTask = tasks.find(
      (task) => task.id === activeTaskId,
    );

    if (!activeTask) return;

    const targetColumn = columns.find(
      (column) => column.id === overId,
    );

    if (targetColumn) {
      if (activeTask.status === targetColumn.id) return;

      updateTask(activeTaskId, {
        status: targetColumn.id,
      });

      return;
    }

    const overTask = tasks.find(
      (task) => task.id === overId,
    );

    if (overTask) {
      if (activeTask.status === overTask.status) return;

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
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.id,
            );

            return (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                count={columnTasks.length}
              >
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                  />
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