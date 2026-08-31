import z from "zod";

export const AddTask = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),

    description: z
        .string()
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

    priority: z.enum(
        ["low", "medium", "high"],
        {
            message: "Priority is required",
        }
    ),

    status: z.enum(
        ["todo", "in-progress", "review", "done"],
        {
            message: "Status is required",
        }
    ),
});

export type AddTaskInput = z.infer<typeof AddTask>;