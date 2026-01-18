import { COLORS } from "@/constants/connectionColor";
import { useState } from "react";

export function useAddConnectionDialog({ onSave, pageId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    color: COLORS[0],
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });
  const [open, setOpen] = useState(false);

  const resetForm = () => {
    setForm({ name: "", email: "", color: COLORS[0] });
    setErrors({ name: false, email: false });
  };

  const handleSave = () => {
    // hadle error
    let hasError = false;

    if (!form.name.trim()) {
      setErrors((e) => ({ ...e, name: true }));
      hasError = true;
    }
    if (!form.email.trim()) {
      setErrors((e) => ({ ...e, email: true }));
      hasError = true;
    }

    if (hasError) return;

    // handle payload
    const payload = {
      ...form,
      page_id: pageId,
    };

    if (onSave) {
      onSave(payload); // parent call mutation for fetch API
    }

    resetForm();
    setOpen(false);
  };

  return { form, setForm, errors, open, setOpen, handleSave, resetForm };
}
