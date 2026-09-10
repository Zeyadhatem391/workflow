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
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editProject,
  EditProjectInput,
} from "@/features/projects/schema/project";
import { useParams, useRouter } from "next/navigation";
import { useProjectStore } from "@/features/projects/store/project.store";
import { Project } from "@/features/projects/types/project";
import { useProjectStatusStore } from "@/features/projects/store/statusProject.store";
import { useProjectPriorityStore } from "@/features/projects/store/priorityProject.store";
import { getCurrentUser } from "@/features/auth/helper/auth";
import { useUserStore } from "@/features/auth/store/register.store";
import { useActivityStore } from "@/features/activity/store/activity.store";

function page() {
  const router = useRouter();

  const params = useParams<{ projectId: string }>();
  const id = params.projectId;

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
  const getProjectById = useProjectStore((state) => state.getProjectById);

  const project = getProjectById(id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditProjectInput>({
    resolver: zodResolver(editProject),
    mode: "all",
    defaultValues: {
      title: project?.title,
      description: project?.description,
      startDate: project?.startDate,
      dueDate: project?.dueDate,
      status: project?.status,
      priority: project?.priority,
      membersList: [],
      admin: project?.admin,
    },
  });
  const startDateRef = useRef<HTMLInputElement | null>(null);

  const startDateRegister = register("startDate");

  const dueDateRef = useRef<HTMLInputElement | null>(null);

  const dueDateRegister = register("dueDate");

  const updateProject = useProjectStore((state) => state.updateProject);
  const projectStatus = useProjectStatusStore((state) => state.statuses);
  const priorities = useProjectPriorityStore((state) => state.priorities);

  const addActivity = useActivityStore((state) => state.addActivity);

  const onSubmit = async (data: EditProjectInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const editProject: Partial<Project> = {
      title: data.title,
      description: data.description,

      startDate: data.startDate,
      dueDate: data.dueDate,

      status: data.status,
      priority: data.priority,

      admin: data.admin,

      members: data.membersList.length,
      membersList: data.membersList,

      userId: user.id,
    };

    updateProject(id, editProject);

    addActivity({
      id: crypto.randomUUID(),
      type: "project-updated",
      title: data.title,
      description: `The project has been successfully updated.`,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      date: new Date().toISOString(),
      userId: user.id,
    });

    router.back();
  };

  const users = useUserStore((state) => state.users);

  return (
    <div className="flex w-full justify-center px-3 py-4 sm:px-5 sm:py-6 lg:px-6">
      <div className="w-full max-w-3xl rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900 sm:p-6 lg:p-7">
        <div className="space-y-5">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Update Project
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
              Updating the project and refining its details.
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
                  placeholder="E-commerce store project"
                  {...register("title")}
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
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
                  placeholder="It is an online shopping site...."
                  {...register("description")}
                  className="h-10 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus-visible:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
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
                        className="h-10 w-full rounded-xl border-gray-200 bg-gray-50 py-5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus-visible:ring-0"
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>

                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        className="rounded-xl p-1 border-gray-200 bg-white dark:border-zinc-700 ring-0 dark:bg-zinc-900"
                      >
                        {projectStatus.map((status) => (
                          <SelectItem
                            key={status.id}
                            value={status.id}
                            className="p-2 dark:hover:bg-gray-300/10 hover:bg-gray-800/10 cursor-pointer"
                          >
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
                        className="rounded-xl p-1 border-gray-200 bg-white dark:border-zinc-700 ring-0 dark:bg-zinc-900"
                      >
                        {priorities.map((priority) => (
                          <SelectItem
                            key={priority.id}
                            value={priority.id}
                            className="p-2 dark:hover:bg-gray-300/10 hover:bg-gray-800/10 cursor-pointer"
                          >
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

                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        className="rounded-xl p-1 border-gray-200 bg-white dark:border-zinc-700 ring-0 dark:bg-zinc-900"
                      >
                        {users.map((user) => (
                          <SelectItem
                            key={user.id}
                            value={user.id}
                            className="p-2 dark:hover:bg-gray-300/10 hover:bg-gray-800/10 cursor-pointer"
                          >
                            {user.name}
                          </SelectItem>
                        ))}
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
                        className="w-(--radix-popover-trigger-width) rounded-xl ring-0 border-gray-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900"
                      >
                        <div className="space-y-1">
                          {users.map((member) => {
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
                                <Checkbox
                                  checked={isSelected}
                                  className="text-white border border-gray-800 dark:border-gray-800"
                                />

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
                <Pencil className="h-4 w-4" />

                {isSubmitting ? "Updating..." : "Update Project"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
