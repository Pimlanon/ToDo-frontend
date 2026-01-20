import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { COLORS } from "@/constants/connectionColor";
import { useAddConnectionDialog } from "../../hooks/addConnectionDialog.hook";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function AddConnectionDialog({ onSave, pageId }) {
  const { form, setForm, errors, open, setOpen, handleSave, resetForm } =
    useAddConnectionDialog({ onSave, pageId });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      {/* Add new connection button */}
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="flex gap-1">
          <Plus size={14} />
          <span className="text-xs font-semibold">Add more</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Add new connection</DialogTitle>
          <DialogDescription>
            Enter the name, email, and choose a color for the new connection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* Name */}
          <Input
            placeholder="Name"
            value={form.name}
            className={cn(
              "text-sm md:text-base",
              errors.name && "border-red-500",
            )}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          {/* Email */}
          <Input
            placeholder="Email"
            value={form.email}
            className={cn(
              "text-sm md:text-base",
              errors.email && "border-red-500",
            )}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          {/* Color */}
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, color: c }))}
                className={cn(
                  "w-8 h-8 rounded-full border-2",
                  form.color === c ? "border-primary" : "border-transparent",
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
