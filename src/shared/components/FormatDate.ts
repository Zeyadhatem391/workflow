export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));


export const formatDateTime = (date: string) => new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
}).format(new Date(date))

export const getRemainingTime = (dueDate: string) => {
  const due = new Date(dueDate).getTime();
  const now = Date.now();

  const difference = due - now;

  if (difference <= 0) {
    return "Overdue";
  }

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} left`;
  }

  if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} left`;
  }

  return `${minutes} ${minutes === 1 ? "minute" : "minutes"} left`;
};


export function formatActivityDate(date: string) {
  const activityDate = new Date(date);

  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  const activityDay = activityDate.toISOString().split("T")[0];
  const todayDay = today.toISOString().split("T")[0];
  const yesterdayDay = yesterday.toISOString().split("T")[0];

  if (activityDay === todayDay) {
    return "Today";
  }

  if (activityDay === yesterdayDay) {
    return "Yesterday";
  }

  return activityDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}