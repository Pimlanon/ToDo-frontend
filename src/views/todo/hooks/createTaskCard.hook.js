import { useState } from "react";
import { KANBAN_STATUS } from "@/constants/kanbanStatus";
import { PRIORITY } from "@/constants/priority";

export function useCreateTaskCard({ data, onSave, status, pageId, onClose }) {
  const [form, setForm] = useState({
    title: data?.title || "",
    description: data?.description || "",
    due_date: data?.due_date || null,
    status:
      KANBAN_STATUS.find((s) => s.key === status)?.value ||
      data?.status ||
      "todo",
    priority: data?.priority || null,
    connection_ids: data?.connections?.map(c => c.id) || [],
  });
  const [errors, setErrors] = useState({ title: false });

  const handleSave = () => {
    if (!form.title.trim()) {
      setErrors({ title: true });
      return;
    }

    const payload = {
      ...form,
      due_date: form.due_date
        ? typeof form.due_date === "string"
          ? form.due_date
          : form.due_date.toISOString()
        : null,
      page_id: pageId,
    };

    if (onSave) {
      onSave(payload); // parent call mutation for fetch API
    }

    onClose?.(); // close popup
  };

  const priorityValue = form.priority ? Number(form.priority) : null;
  const priorityConfig = priorityValue ? PRIORITY[priorityValue] : null;
  return {
    form,
    setForm,
    errors,
    handleSave,
    priorityConfig,
    priorityValue,
  };
}
