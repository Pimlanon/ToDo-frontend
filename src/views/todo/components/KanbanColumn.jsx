import React, { useState } from "react";
import { KANBAN_STATUS } from "@/constants/kanbanStatus";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateTaskCard from "./CreateTaskCard";
import { useCreateTask } from "@/queries/tasks.queries";

const KanbanColumn = ({ statusKey, pageId, count, connectionsList, children,  }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const status = KANBAN_STATUS.find((s) => s.key === statusKey);
  const Icon = status?.icon;

  const createTaskMutation = useCreateTask("055e1675c8e577bf231a0f4d26314cda");

  return (
    <div className="min-w-[300px] h-full w-full bg-muted rounded-xl p-4 flex flex-col">
      {/* Header  */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold  flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          {status?.label}{" "}
          <span className="text-muted-foreground">({count})</span>
        </h2>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <Plus />
            </Button>
          </DialogTrigger>

          <DialogContent className="p-2 max-w-sm">
            <CreateTaskCard
              data={null}
              onClose={() => setOpenCreate(false)}
              isPopup
              onSave={(data) => createTaskMutation.mutate(data)}
              status={statusKey}
              pageId={pageId}
              connectionsList={connectionsList}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Card Lists */}
      <div className="mt-4 flex-1 overflow-y-auto pr-2 flex flex-col items-center space-y-3">
        {children}
      </div>
    </div>
  );
};

export default KanbanColumn;
