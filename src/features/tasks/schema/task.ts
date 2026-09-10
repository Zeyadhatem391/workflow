import z from "zod";

export const AddTask = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be less than 500 characters"),

    projectId: z
        .string()
        .min(1, "Project is required"),

    assigneeId: z
        .string()
        .min(1, "Assignee is required"),

    dueDate: z
        .string()
        .min(1, "Due date is required"),

    priority: z
        .string()
        .min(1, "Priority is required"),

    status: z
        .string()
        .min(1, "Status is required"),
});

export type AddTaskInput = z.infer<typeof AddTask>;


export const editTask = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be less than 500 characters")
        .optional(),

    projectId: z
        .string()
        .optional(),

    assigneeId: z
        .string()

        .optional(),

    dueDate: z
        .string()
        .optional(),

    priority: z
        .string()
        .optional(),

    status: z
        .string()
        .optional(),
});

export type EditTaskInput = z.infer<typeof editTask>;