import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "./ConfirmDialog";
import { AddConnectionDialog } from "./AddConnectionDialog";
import { useCreateConnection } from "@/queries/connections.queries";
import { Users } from "lucide-react";

export default function ConnectionsPopover({ connections, pageId }) {
  const createConnection = useCreateConnection(pageId);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="cursor-pointer text-sm">
          <Users />
          You have {connections?.count ?? "0"} connections
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-0 mr-4">
        <div className="flex justify-between items-center pl-3 pr-2 pt-2">
          <p className="text-sm font-semibold text-primary">Connections</p>
          <AddConnectionDialog
            pageId={pageId}
            onSave={(data) => createConnection.mutate(data)}
          />
        </div>

        {/* Connection List*/}
        <div className="max-h-56 overflow-y-auto p-3 kanban-scroll">
          {connections?.items?.length ? (
            connections.items.map((c) => (
              <div
                key={c.id}
                className="flex items-start gap-3 py-2 border-b last:border-b-0"
              >
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: c.color }}
                >
                  {/* use first string in name  */}
                  {c.name.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </div>

                {/* Delete */}
                <ConfirmDialog id={c.id} keyword="connection" pageId={pageId} />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">
              No connections
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
