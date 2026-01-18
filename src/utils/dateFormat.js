import { format } from "date-fns";

export const formatDate = (date, pattern = "MMM dd") => {
  if (!date) return "-";
  return format(new Date(date), pattern);
};