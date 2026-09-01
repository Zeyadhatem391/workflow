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
import { Checkbox } from "@/components/ui/checkbox";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRef } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddProject,
  AddProjectInput,
} from "@/features/projects/schema/project";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/features/projects/store/project.store";
import { Project } from "@/features/projects/types/project";

function page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddProjectInput>({
    resolver: zodResolver(AddProject),
    mode: "all",
    defaultValues: {
      status: "planning",
      priority: "medium",
      membersList: [],
    },
  });
  const startDateRef = useRef<HTMLInputElement | null>(null);

  const startDateRegister = register("startDate");

  const dueDateRef = useRef<HTMLInputElement | null>(null);

  const dueDateRegister = register("dueDate");

  const addProject = useProjectStore((state) => state.addProject);

  const onSubmit = async (data: AddProjectInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newProject: Project = {
      id: crypto.randomUUID(),

      title: data.title,
      description: data.description,

      startDate: data.startDate,
      dueDate: data.dueDate,

      status: data.status,
      priority: data.priority,

      admin: data.admin,

      tasks: 0,
      completedTasks: 0,

      members: data.membersList.length,
      membersList: data.membersList,

      progress: 0,

      createdAt: new Date().toISOString(),
    };

    addProject(newProject);

    reset();
  };

  return (
    <div className="flex w-full justify-center px-3 py-4 sm:px-5 sm:py-6 lg:px-6">
      <div className="w-full max-w-3xl rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900 sm:p-6 lg:p-7">
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Add Project
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
              Create a new project and configure its details.
            </p>
          </div>

          <form
            className="space-y-6 sm:space-y-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label
                  htmlFor="title"
                  className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400"
                >
                  Title
                </Label>

                <Input
                  id="title"
                  type="text"
                  {...register("title")}
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-blue-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                {errors.title && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <Label
                  htmlFor="description"
                  className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400"
                >
                  Description
                </Label>

                <Input
                  id="description"
                  type="text"
                  {...register("description")}
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-blue-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                {errors.description && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label
                  htmlFor="startdate"
                  className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400"
                >
                  Start Date
                </Label>

                <Input
                  id="startdate"
                  type="datetime-local"
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 py-5 text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  {...startDateRegister}
                  ref={(element) => {
                    startDateRegister.ref(element);
                    startDateRef.current = element;
                  }}
                  onClick={() => startDateRef.current?.showPicker()}
                />

                {errors.startDate && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <Label
                  htmlFor="duedate"
                  className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400"
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
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 py-5 text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />

                {errors.dueDate && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                        className="h-10 w-full rounded-xl border-gray-200 bg-gray-50 py-5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
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
                        className="h-10 w-full rounded-xl border-gray-200 bg-gray-50 py-5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      >
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="admin"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="admin"
                      className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400"
                    >
                      Admin
                    </Label>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="admin"
                        className="h-10 w-full rounded-xl border-gray-200 bg-gray-50 py-5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      >
                        <SelectValue placeholder="Select Admin" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                        <SelectItem value="zeyad">Zeyad</SelectItem>
                        <SelectItem value="ali">Ali</SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.admin && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {errors.admin.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="membersList"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="members"
                      className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400"
                    >
                      Members
                    </Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="members"
                          variant="outline"
                          role="combobox"
                          className="h-10 w-full justify-between rounded-xl border-gray-200 bg-gray-50 py-5 font-normal hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                        >
                          <span className="truncate">
                            {field.value.length > 0
                              ? `${field.value.length} ${
                                  field.value.length === 1
                                    ? "Member"
                                    : "Members"
                                } Selected`
                              : "Select Members"}
                          </span>

                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="start"
                        side="bottom"
                        sideOffset={4}
                        className="w-(--radix-popover-trigger-width) rounded-xl border-gray-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900"
                      >
                        <div className="space-y-1">
                          {[
                            { id: "zeyad", name: "Zeyad" },
                            { id: "ahmed", name: "Ahmed" },
                            { id: "mohamed", name: "Mohamed" },
                            { id: "ali", name: "Ali" },
                          ].map((member) => {
                            const isSelected = field.value.includes(member.id);

                            return (
                              <div
                                key={member.id}
                                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-zinc-800"
                                onClick={() => {
                                  const updatedMembers = isSelected
                                    ? field.value.filter(
                                        (id) => id !== member.id,
                                      )
                                    : [...field.value, member.id];

                                  field.onChange(updatedMembers);
                                }}
                              >
                                <Checkbox checked={isSelected} />

                                <span className="text-sm font-medium">
                                  {member.name}
                                </span>

                                {isSelected && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>

                    {errors.membersList && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {errors.membersList.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 dark:border-zinc-700 sm:flex-row sm:justify-end">
              <Button
                onClick={() => {
                  reset();
                  router.back();
                }}
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="h-10 w-full cursor-pointer rounded-lg border-gray-300 font-semibold text-gray-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:w-24"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-full cursor-pointer gap-2 rounded-lg bg-blue-800 font-semibold text-white shadow-sm transition-all hover:bg-blue-900 hover:-translate-y-0.5 hover:shadow-md dark:bg-blue-700 dark:hover:bg-blue-600 sm:w-44"
              >
                <Plus className="h-4 w-4" />

                {isSubmitting ? "Adding..." : "Add Project"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
