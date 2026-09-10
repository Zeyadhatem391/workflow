"use client";

import {
  CheckCircle2,
  CirclePlus,
  FolderKanban,
  LogIn,
  LogOut,
  Pencil,
  Trash2,
} from "lucide-react";
import { Activity } from "../types/activity";





export const activityConfig = {
  "project-created": {
    icon: FolderKanban,
    className: "bg-status-success-bg text-status-success",
    label: "Project created",
  },

  "project-updated": {
    icon: Pencil,
    className: "bg-status-info-bg text-status-info",
    label: "Project updated",
  },

  "project-deleted": {
    icon: Trash2,
    className: "bg-red-400/20 text-red-600",
    label: "Project deleted",
  },

  "task-created": {
    icon: CirclePlus,
    className: "bg-status-success-bg text-status-success",
    label: "Task created",
  },

  "task-updated": {
    icon: Pencil,
    className: "bg-status-warning-bg text-status-warning",
    label: "Task updated",
  },

  "task-deleted": {
    icon: Trash2,
    className: "bg-red-400/20 text-red-600",
    label: "Task deleted",
  },

  "task-status": {
    icon: CheckCircle2,
    className: "bg-status-info-bg text-status-info",
    label: "Task status changed",
  },

  // Status
  "status-created": {
    icon: CirclePlus,
    className: "bg-status-success-bg text-status-success",
    label: "Status created",
  },

  "status-updated": {
    icon: Pencil,
    className: "bg-status-warning-bg text-status-warning",
    label: "Status updated",
  },

  "status-deleted": {
    icon: Trash2,
    className: "bg-red-400/20 text-red-600",
    label: "Status deleted",
  },

  // Priority
  "priority-created": {
    icon: CirclePlus,
    className: "bg-status-success-bg text-status-success",
    label: "Priority created",
  },

  "priority-updated": {
    icon: Pencil,
    className: "bg-status-warning-bg text-status-warning",
    label: "Priority updated",
  },

  "priority-deleted": {
    icon: Trash2,
    className: "bg-red-400/20 text-red-600",
    label: "Priority deleted",
  },
  "log-in": {
    icon: LogIn,
    className: "bg-blue-500/50 text-blue-600",
    label: "Login",
  },
  "log-out": {
    icon: LogOut,
    className: "bg-red-400/20 text-red-600",
    label: "Logout",
  },
} as const;



export function groupActivitiesByDate(activities: Activity[]) {
  const groups = activities.reduce<Record<string, Activity[]>>(
    (groups, activity) => {
      const dateKey = new Date(activity.date).toISOString().split("T")[0];

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(activity);

      return groups;
    },
    {},
  );

  return Object.fromEntries(
    Object.entries(groups).sort(
      ([dateA], [dateB]) =>
        new Date(dateB).getTime() - new Date(dateA).getTime(),
    ),
  );
}