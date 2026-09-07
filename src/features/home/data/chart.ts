export interface TaskActivity {
  month: string;
  created: number;
  completed: number;
}
export const taskActivityData: TaskActivity[] = [
  { month: "Jan", created: 18, completed: 12 },
  { month: "Feb", created: 25, completed: 17 },
  { month: "Mar", created: 20, completed: 14 },
  { month: "Apr", created: 32, completed: 22 },
  { month: "May", created: 28, completed: 20 },
  { month: "Jun", created: 35, completed: 27 },
  { month: "Jul", created: 30, completed: 24 },
  { month: "Aug", created: 38, completed: 29 },
  { month: "Sep", created: 34, completed: 26 },
  { month: "Oct", created: 42, completed: 33 },
  { month: "Nov", created: 37, completed: 30 },
  { month: "Dec", created: 45, completed: 36 },
];