
import { ChartColumn, FolderKanban, LayoutDashboard, ListTodo, Settings, Users2 } from "lucide-react";

export const menus = [
    {
        icon: LayoutDashboard,
        name: "Dashboard Home",
        link: "/",
    },
    {
        icon: FolderKanban,
        name: "Projects",
        link: "/dashboard/projects",
    },
    {
        icon: ListTodo,
        name: "Tasks",
        link: "/dashboard/tasks",
    },
    {
        icon: ChartColumn,
        name: "analytics",
        link: "/dashboard/analytics",
    },
    {
        icon: Users2,
        name: "Team",
        link: "/dashboard/team",
    },
    {
        icon: Settings,
        name: "Settings",
        link: "/dashboard/settings",
    },
];