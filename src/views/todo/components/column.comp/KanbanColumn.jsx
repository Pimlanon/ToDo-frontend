import React, { useState } from "react";
import { KANBAN_STATUS } from "@/constants/kanbanStatus";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateTaskCard from "../card.comp/CreateTaskCard";
import { useCreateTask } from "@/queries/tasks.queries";

const KanbanColumn = ({
  statusKey,
  pageId,
  count,
  connectionsList,
  children,
}) => {
  const [openCreate, setOpenCreate] = useState(false);
  const status = KANBAN_STATUS.find((s) => s.key === statusKey);
  const Icon = status?.icon;

  const createTaskMutation = useCreateTask(pageId);

  return (
    <div className="min-w-[300px] h-full w-full bg-muted rounded-xl p-4 xl:p-8 flex flex-col">
      {/* Header  */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold  flex items-center gap-2">
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
      <div className="flex-1 overflow-y-auto mt-4 min-h-0 kanban-scroll">
        <div className="pr-2 flex flex-col items-center space-y-3 xl:space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
