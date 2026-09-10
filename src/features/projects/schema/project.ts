
import z from "zod";

export const AddProject = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be less than 500 characters"),

    startDate: z
        .string()
        .min(1, "Start date is required"),

    dueDate: z
        .string()
        .min(1, "Due date is required"),

    status: z.string(),

    priority: z.string(),

    admin: z
        .string()
        .min(1, "Admin is required"),

    membersList: z
        .array(z.string())
        .min(1, "Select at least one member"),
});

export type AddProjectInput = z.infer<typeof AddProject>;


export const editProject = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be less than 500 characters")
        .optional(),

    startDate: z
        .string()
        .min(1, "Start date is required")
        .optional(),

    dueDate: z
        .string()
        .min(1, "Due date is required")
        .optional(),

    status: z
        .string()
        .optional(),

    priority: z
        .string()
        .optional(),

    admin: z
        .string()
        .min(1, "Admin is required")
        .optional(),

    membersList: z
        .array(z.string())
        .min(1, "Select at least one member"),
});

export type EditProjectInput = z.infer<typeof editProject>;