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