"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useRef } from "react";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useProjectStore } from "@/features/projects/store/project.store";
import { AddTask, AddTaskInput } from "@/features/tasks/schema/task";
import { Textarea } from "@/components/ui/textarea";
import { useTaskStore } from "@/features/tasks/store/task.store";
import { Task } from "@/features/tasks/types/task";
import { useTaskStatusStore } from "@/features/tasks/store/statusTasks.store";
import { useTasksPriorityStore } from "@/features/tasks/store/priorityTasks.store";
import { getCurrentUser } from "@/features/auth/helper/auth";

function page() {
  const router = useRouter();

  const user = getCurrentUser();

  if (!user) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-muted-foreground">
          Please log in to perform any activities.
        </p>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskInput>({
    resolver: zodResolver(AddTask),
    mode: "all",
    defaultValues: {
      status: "",
      priority: "",
    },
  });

  const users = [
    {
      id: "user-1",
      name: "Zeyad Hatem",
    },
    {
      id: "user-2",
      name: "Ahmed Ali",
    },
    {
      id: "user-3",
      name: "Mohamed Hassan",
    },
    {
      id: "user-4",
      name: "Ali Mahmoud",
    },
  ];

  const dueDateRef = useRef<HTMLInputElement | null>(null);

  const dueDateRegister = register("dueDate");

  const addTask = useTaskStore((state) => state.addTask);

  const taskStatus = useTaskStatusStore((state) => state.statuses);
  const priorities = useTasksPriorityStore((state) => state.priorities);

  const onSubmit = async (data: AddTaskInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newTask: Task = {
      id: crypto.randomUUID(),

      title: data.title,
      description: data.description,

      dueDate: data.dueDate,

      status: data.status,
      priority: data.priority,

      assigneeId: data.assigneeId,
      projectId: data.projectId,

      userId: user.id,

      createdAt: new Date().toISOString(),
    };

    addTask(newTask);

    reset();
  };
  const projects = useProjectStore((state) => state.projects);

  return (
    <div className="flex w-full justify-center px-3 py-4 sm:px-5 sm:py-6 lg:px-6">
      <div className="w-full max-w-3xl rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900 sm:p-6 lg:p-7">
        <div className="space-y-5">
          {/* Header */}
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Add Task
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Create a new task and assign it to a project member.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Title + Due Date */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Title */}
              <div className="grid gap-1.5">
                <Label
                  htmlFor="title"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Title
                </Label>

                <Input
                  id="title"
                  type="text"
                  {...register("title")}
                  placeholder="Enter task title"
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                {errors.title && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Due Date */}
              <div className="grid gap-1.5">
                <Label
                  htmlFor="duedate"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Due Date
                </Label>

                <Input
                  id="duedate"
                  type="datetime-local"
                  {...dueDateRegister}
                  ref={(element) => {
                    dueDateRegister.ref(element);
                    dueDateRef.current = element;
                  }}
                  onClick={() => dueDateRef.current?.showPicker()}
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                {errors.dueDate && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="status"
                      className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400"
                    >
                      Status
                    </Label>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="status"
                        className="h-10 w-full rounded-xl border-gray-200 bg-gray-50 py-5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus-visible:ring-0"
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>

                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        className="rounded-xl border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                      >
                        {taskStatus.map((status) => (
                          <SelectItem key={status.id} value={status.id}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {errors.status && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="priority"
                      className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400"
                    >
                      Priority
                    </Label>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="priority"
                        className="h-10 w-full rounded-xl border-gray-200 bg-gray-50 py-5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus-visible:ring-0"
                      >
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>

                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        className="rounded-xl border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                      >
                        {priorities.map((priority) => (
                          <SelectItem key={priority.id} value={priority.id}>
                            {priority.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {errors.priority && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {errors.priority.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Project + Assignee */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Project */}
              <Controller
                name="projectId"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="project"
                      className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      Project
                    </Label>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="project"
                        className="h-11 py-5 w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      >
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>

                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        className="rounded-xl border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                      >
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {errors.projectId && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.projectId.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Assignee */}
              <Controller
                name="assigneeId"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="assigneeId"
                      className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      Assignee
                    </Label>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="assigneeId"
                        className="h-11 py-5 w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      >
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>

                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        className="rounded-xl border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                      >
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {errors.assigneeId && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.assigneeId.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Description */}
            <div className="grid gap-1.5">
              <Label
                htmlFor="description"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Description
              </Label>

              <Textarea
                id="description"
                {...register("description")}
                placeholder="Describe the task..."
                className="h-28 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />

              {errors.description && (
                <p className="text-xs font-medium text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div
              className="
              flex flex-col-reverse gap-3
              border-t border-border pt-5
              sm:flex-row sm:justify-end
            "
            >
              <Button
                onClick={() => {
                  reset();
                  router.back();
                }}
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="
                h-11 w-full cursor-pointer rounded-xl
                border-border
                font-semibold
                sm:w-28
              "
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                h-11 w-full cursor-pointer gap-2 rounded-xl
                bg-blue-700
                font-semibold text-white
                shadow-sm
                transition-all
                hover:bg-blue-800
                hover:shadow-md
                dark:bg-blue-600
                dark:hover:bg-blue-700
                sm:w-40
              "
              >
                <Plus className="h-4 w-4" />

                {isSubmitting ? "Adding..." : "Add Task"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
