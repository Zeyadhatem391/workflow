export interface Task {
    id: string;

    title: string;
    description: string;

    projectId: string;
    assigneeId: string;

    userId: string;

    dueDate: string;

    priority: string;
    status: string;

    createdAt: string;
}