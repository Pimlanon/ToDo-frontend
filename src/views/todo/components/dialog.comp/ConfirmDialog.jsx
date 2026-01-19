import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteTask } from "@/queries/tasks.queries";
import { useDeleteConnection } from "@/queries/connections.queries";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ConfirmDialog = ({ id, keyword, pageId }) => {
  const deleteTask = useDeleteTask(pageId);
  const deleteConnection = useDeleteConnection(pageId);

  const onDelete = () => {
    if (keyword === "task") deleteTask.mutate(id);
    if (keyword === "connection") deleteConnection.mutate(id);
  };

  return (
    <AlertDialog>
      {/* Delete button */}
      <AlertDialogTrigger asChild>
        {keyword === "task" ? (
          <Button variant="secondary" className="w-full mt-3">
            Delete
          </Button>
        ) : (
          <button
            type="button"
            className="text-muted-foreground  cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        {/* Header */}
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this {keyword}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer Button */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-secondary text-secondary-foreground hover:bg-secondary-foreground/20"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
