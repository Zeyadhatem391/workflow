export interface Task {
    id: string;

    title: string;
    description: string;

    projectId: string;
    assigneeId: string;

    dueDate: string;

    priority: "low" | "medium" | "high";
    status: "todo" | "in-progress" | "review" | "done";

    createdAt: string;
}