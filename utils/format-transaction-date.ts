import { format, isToday, isYesterday } from "date-fns";

export const formatTransactionDate = (date: Date) => {
  if (isToday(date)) {
    return `Today, ${format(date, "h:mm a")}`;
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, "h:mm a")}`;
  }
  
  return format(date, "MMM d, h:mm a");
};
