import { ListTodo, Loader2, CheckCircle } from "lucide-react";

export const KANBAN_STATUS = [
  { key: "todo", label: "To Do", icon: ListTodo, value: 1 },
  { key: "in_progress", label: "In Progress", icon: Loader2, value: 2 },
  { key: "done", label: "Done", icon: CheckCircle, value: 3 },
] 