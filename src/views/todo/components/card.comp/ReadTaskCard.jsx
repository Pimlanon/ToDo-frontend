import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Calendar, Flag, User, Siren } from "lucide-react";
import { PRIORITY } from "@/constants/priority";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/dateFormat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ReadTaskCard = ({
  title,
  description,
  due_date,
  priority,
  over_due,
  connections,
  onClick,
}) => {
  return (
    <div className="w-full max-w-xl xl:space-y-5  bg-background border rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 w-full">
          {over_due && <Siren className="text-destructive" />}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="font-semibold text-xl leading-tight truncate max-w-[260px] 2xl:max-w-[400px] cursor-default">
                  {title}
                </h3>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs break-words">{title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          size="icon"
          className="h-6 w-6"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Description */}
      <Accordion type="single" collapsible className="mt-2">
        <AccordionItem value="desc">
          <AccordionTrigger className="text-xs py-1 cursor-pointer">
            Description
          </AccordionTrigger>
          <AccordionContent className="text-xs text-muted-foreground whitespace-pre-wrap">
            {description}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Footer */}
      <TooltipProvider>
        <div className="flex justify-between mt-2">
          {/* Due date */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex gap-3 items-center text-muted-foreground",
                  over_due && "text-destructive!",
                )}
              >
                <Calendar size={18} className={cn("text-primary", over_due && "text-destructive!")} />
                <span className="text-xs">
                  {due_date ? formatDate(due_date) : "-"}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {due_date ? formatDate(due_date, "dd/MM/yyyy") : "No due date"}
            </TooltipContent>
          </Tooltip>

          {/* Priority */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex gap-3 justify-center items-center">
                <Flag
                  size={18}
                  className={cn(
                    PRIORITY[priority]?.color,
                    priority && "fill-current",
                  )}
                />
                <span className="hidden xl:inline text-xs text-muted-foreground">
                  {priority ? PRIORITY[priority]?.label : "-"}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {priority ? PRIORITY[priority]?.label : "No priority"}
            </TooltipContent>
          </Tooltip>

          {/* Connection */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex gap-3 justify-end items-center w-fit">
                <User size={18} />
                <span className="text-xs text-muted-foreground">
                  {connections?.length || ""}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {connections?.length ? (
                connections.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-start gap-3 py-2 border-b !last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className=" font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="">No connections</p>
              )}
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ReadTaskCard;
