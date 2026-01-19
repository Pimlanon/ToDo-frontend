import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { COLORS } from "@/constants/connectionColor";
import { useAddConnectionDialog } from "../../hooks/addConnectionDialog.hook";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

export function AddConnectionDialog({ onSave, pageId }) {
  const { form, setForm, errors, open, setOpen, handleSave, resetForm } =
    useAddConnectionDialog({ onSave, pageId });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* Add new connection button */}
      <AlertDialogTrigger asChild>
        <Button variant="link" size="sm" className="flex gap-1">
          <Plus size={14} />
          <span className="text-xs font-semibold">Add more</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        {/* Header */}
        <AlertDialogHeader>
          <AlertDialogTitle>Add new connection</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the name, email, and choose a color for the new connection.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3">
          {/* Name */}
          <Input
            placeholder="Name"
            value={form.name}
            className={errors.name ? "border-red-500" : ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          {/* Email */}
          <Input
            placeholder="Email"
            value={form.email}
            className={errors.email ? "border-red-500" : ""}
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
                className={`w-8 h-8 rounded-full border-2 ${
                  form.color === c ? "border-primary" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={resetForm}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault(); // stop auto close
              handleSave();
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
