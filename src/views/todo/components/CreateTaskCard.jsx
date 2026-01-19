import React from "react";
import { X, Flag, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { KANBAN_STATUS } from "@/constants/kanbanStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRIORITY } from "@/constants/priority";
import { cn } from "@/lib/utils";
import ConfirmDialog from "./ConfirmDialog";
import { useCreateTaskCard } from "../hooks/createTaskCard.hook";
import { formatDate } from "@/utils/dateFormat";
import { Badge } from "@/components/ui/badge";
import { ConnectionSelector } from "./ConnectionSelector";

const CreateTaskCard = ({
  data,
  onClose,
  onSave,
  isPopup = false,
  status,
  pageId,
  connectionsList,
}) => {
  const { form, setForm, errors, handleSave, priorityConfig, priorityValue } =
    useCreateTaskCard({ data, onSave, status, pageId, onClose });

  return (
    <div
      className={cn(
        "relative  p-4 w-full max-w-xl",
        !isPopup && "border bg-background rounded-xl shadow",
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 ">
        <h3 className="text-lg font-semibold">
          {data ? "Edit Card" : "Create New Card"}
        </h3>
        {!isPopup && (
          <button type="button" className="cursor-pointer" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Title */}
      <Input
        placeholder="Title"
        className={cn(
          "mb-3",
          errors.title && "border-red-500 focus-visible:ring-red-500",
        )}
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* Description */}
      <Textarea
        placeholder="Description"
        className="mb-3"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <div className="flex gap-2 mb-3">
        {/* Due Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex-1">
              <CalendarIcon />
              {form.due_date ? formatDate(form.due_date) : "Pick due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={form.due_date}
              onSelect={(date) => setForm({ ...form, due_date: date })}
            />
          </PopoverContent>
        </Popover>

        {/* Priority */}
        <Select
          value={priorityValue ? String(priorityValue) : undefined}
          onValueChange={(v) => setForm({ ...form, priority: Number(v) })}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Priority">
              {priorityConfig && (
                <div className="flex items-center gap-2">
                  <Flag
                    className={cn(
                      "w-4 h-4 fill-current",
                      priorityConfig?.color,
                    )}
                  />
                  <span>{priorityConfig?.label}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {[1, 2, 3].map((p) => (
              <SelectItem key={p} value={String(p)}>
                <div className={cn("flex items-center text-primary gap-2")}>
                  <Flag
                    className={cn("w-4 h-4 fill-current", PRIORITY[p].color)}
                  />
                  {PRIORITY[p].label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="flex gap-2 mb-3">
        {KANBAN_STATUS.map((s) => {
          const Icon = s.icon;
          return (
            <Button
              key={s.value}
              variant={form.status === s.value ? "default" : "outline"}
              className="flex-1 flex gap-1 !px-2"
              onClick={() => setForm({ ...form, status: s.value })}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden xl:inline">{s.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Connections */}
      <ConnectionSelector
        connections={connectionsList?.items || []}
        selectedIds={form.connection_ids}
        onChange={(ids) =>
          setForm((prev) => ({ ...prev, connection_ids: ids }))
        }
      />

      {/* Submit Button */}
      <Button className="w-full mt-3" onClick={handleSave}>
        Submit
      </Button>

      {/* Delete Button */}
      {data?.title && <ConfirmDialog id={data?.id} keyword={"task"} />}
    </div>
  );
};

export default CreateTaskCard;
