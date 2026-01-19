import React from "react";
import { Calendar, Clock, Siren } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { KANBAN_STATUS } from "@/constants/kanbanStatus";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  // Mock data
  const todayTasks = {
    todo: [
      { id: 1, title: "Review pull requests" },
      { id: 2, title: "Update documentation" },
      { id: 3, title: "Design new feature mockup" },
    ],
    in_progress: [
      { id: 4, title: "Fix authentication bug" },
      { id: 5, title: "Implement dark mode" },
    ],
  };

  const overdueTasks = {
    todo: [
      { id: 6, title: "Submit quarterly report", due_date: "2026-01-15" },
      { id: 7, title: "Client meeting prep", due_date: "2026-01-17" },
    ],
    in_progress: [
      { id: 8, title: "Database migration", due_date: "2026-01-16" },
      { id: 9, title: "Security audit", due_date: "2026-01-18" },
    ],
  };

  const TaskItem = ({ task, showDate = false }) => (
    <SidebarMenuItem>
      <div className="px-2 py-2">
        <div className="flex flex-col w-full gap-1">
          <span className="text-white  text-sm truncate">・ {task.title}</span>
          {showDate && (
            <span
              className={cn(
                "text-white text-xs  flex items-center gap-1",
                showDate && "text-red-300",
              )}
            >
              <Clock className="w-3 h-3" />
              {new Date(task.due_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
    </SidebarMenuItem>
  );

  const StatusGroup = ({ title, tasks, icon: Icon, showDate = false }) => (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        <div className="text-sm flex items-center gap-2">
          <Icon size={18} />
          <span>{title}</span>
        </div>
        <span className="bg-white text-sidebar px-2 py-0.5 rounded-full text-xs">
          {tasks.length}
        </span>
      </SidebarGroupLabel>
      {showDate && (
        <div>
          <p className="text-xs text-white/80 pl-2">Show only latest 3 tasks</p>
        </div>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} showDate={showDate} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  const totalToday = todayTasks.todo.length + todayTasks.in_progress.length;
  const totalOverdue =
    overdueTasks.todo.length + overdueTasks.in_progress.length;

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <h2 className="text-xl font-semibold text-white">Task Overview</h2>
      </SidebarHeader>

      <SidebarContent>
        {/* Today Task */}
        <SidebarGroup>
          <SidebarGroupLabel className="mt-3 text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-white" />
              <span className="font-semibold">Today</span>
            </div>
            <span className="text-sm text-muted">{totalToday} tasks</span>
          </SidebarGroupLabel>
          <Separator />
        </SidebarGroup>

        <StatusGroup
          title="To Do"
          tasks={todayTasks.todo}
          icon={KANBAN_STATUS[0].icon}
        />

        <StatusGroup
          title="In Progress"
          tasks={todayTasks.in_progress}
          icon={KANBAN_STATUS[1].icon}
        />

        {/* Overdue Tasks */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-base flex items-center justify-between py-3 text-red-900">
            <div className="flex items-center gap-2">
              <Siren className="w-5 h-5 text-red-300" />
              <span className="font-semibold text-red-300">Overdue</span>
            </div>
            <span className="text-sm text-red-300">{totalOverdue} tasks</span>
          </SidebarGroupLabel>
          <Separator />
        </SidebarGroup>

        <StatusGroup
          title="To Do"
          tasks={overdueTasks.todo}
          icon={KANBAN_STATUS[0].icon}
          showDate={true}
        />

        <StatusGroup
          title="In Progress"
          tasks={overdueTasks.in_progress}
          icon={KANBAN_STATUS[1].icon}
          showDate={true}
        />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
