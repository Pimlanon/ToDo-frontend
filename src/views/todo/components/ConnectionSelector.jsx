import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function ConnectionSelector({
  connections,
  selectedIds,
  onChange,
}) {
  return (
    <div className="mb-3">
      <p className="text-sm font-medium mb-2">Assign Connections</p>

      {/* Selected Badges */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedIds?.map((id) => {
          const c = connections?.find((x) => x.id === id);
          if (!c) return null;

          return (
            <Badge
              key={c.id}
              variant="outline"
              className="flex items-center gap-1"
            >
              <span
                className="w-5 h-5 rounded-full text-xs flex items-center justify-center text-white"
                style={{ backgroundColor: c.color }}
              >
                {c.name[0].toUpperCase()}
              </span>
              {c.name}
            </Badge>
          );
        })}
      </div>

      {/* Select List */}
      <div className="border rounded-md max-h-40 overflow-y-auto">
        {connections?.map((c) => {
          const checked = selectedIds?.includes(c.id);

          return (
            <div
              key={c.id}
              onClick={() =>
                onChange(
                  checked
                    ? selectedIds.filter((x) => x !== c.id)
                    : [...selectedIds, c.id]
                )
              }
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-full text-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: c.color }}
                >
                  {c.name[0].toUpperCase()}
                </span>
                <div>
                  <p className="text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </div>
              </div>

              {checked && <Check className="w-4 h-4 text-primary" />}
            </div
            
            >
          );
        })}
      </div>
    </div>
  );
}
