

export interface Project {
  id: string;
  title: string;
  description: string;

  startDate: string;
  dueDate: string;

  status: "planning" | "active" | "completed" | "on-hold";
  priority: "low" | "medium" | "high";

  admin: string;

  tasks: number;
 

  members: number;
  membersList?: string[];

  progress: number;

  createdAt: string;
 
}