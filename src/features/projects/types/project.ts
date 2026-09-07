

export interface Project {
  id: string;
  title: string;
  description: string;

  startDate: string;
  dueDate: string;

  status: string;
  priority: string;

  admin: string;

  userId: string;

  members: number;
  membersList?: string[];


  createdAt: string;

}