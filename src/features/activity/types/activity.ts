
{/*
    add and delete and edit (project,task,Categories)
    
*/}

type ActivityType =
    | "project-created"
    | "project-updated"
    | "project-deleted"
    | "task-created"
    | "task-updated"
    | "task-deleted"
    | "task-status"
    | "status-created"
    | "status-updated"
    | "status-deleted"
    | "priority-created"
    | "priority-updated"
    | "priority-deleted"
    | "log-in"
    | "log-out"
    ;

export type Activity = {
    id: string;
    type: ActivityType;
    title: string;
    description: string;
    time: string;
    date: string;
    userId: string;
    status?: {
        from: string;
        to: string;
    };
};