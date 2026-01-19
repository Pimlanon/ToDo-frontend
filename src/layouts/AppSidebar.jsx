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
import { cn } from "@/lib/utils";
import { useGetSidebarByPage } from "@/queries/tasks.queries";
import { usePageStore } from "@/stores/usePageStore";

const AppSidebar = () => {
  const pageId = usePageStore((state) => state.pageId);
  const { data: sidebarData } = useGetSidebarByPage(pageId);

  const todayTasks = sidebarData?.today;
  const overdueTasks = sidebarData?.overdue;

  const TaskItem = ({ task, showDate = false }) => (
    <SidebarMenuItem className="border-b-1 border-white/30 last:border-b-0">
      <div className="px-2 py-2 ">
        <div className="flex flex-col w-full gap-1 ">
          <span className="text-white font-light text-sm truncate">
            ・ {task.title}
          </span>
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

  const StatusGroup = ({
    title,
    tasks,
    icon: Icon,
    count,
    showDate = false,
  }) => (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        <div className="text-sm flex items-center gap-2">
          <Icon size={18} />
          <span className="font-semibold">{title}</span>
        </div>
        <span className="bg-white text-sidebar px-2 py-0.5 rounded-full text-xs">
          {count}
        </span>
      </SidebarGroupLabel>
      {showDate && (
        <div>
          <p className="text-xs text-white/80 pl-2">Show only latest 3 tasks</p>
        </div>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {tasks?.map((task) => (
            <TaskItem key={task?.id} task={task} showDate={showDate} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  const totalToday = todayTasks?.todo?.count + todayTasks?.in_progress?.count;
  const totalOverdue =
    overdueTasks?.todo?.count + overdueTasks?.in_progress?.count;

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3 flex w-full justify-center items-center">
        <h2 className="text-xl font-semibold text-white">Task Overview</h2>
      </SidebarHeader>

      <SidebarContent className="p-3 ">
        {/* Today Task */}
        <div className="bg-muted-foreground/30 rounded-md">
          <SidebarGroup>
            <SidebarGroupLabel className="mt-6 h-0  text-base flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-white" />
                <span className="font-semibold text-lg">Today</span>
              </div>
              <span className="text-sm text-muted">{totalToday} tasks</span>
            </SidebarGroupLabel>
          </SidebarGroup>

          <StatusGroup
            title="To Do"
            tasks={todayTasks?.todo?.items}
            icon={KANBAN_STATUS[0].icon}
            count={todayTasks?.todo?.count}
          />

          <StatusGroup
            title="In Progress"
            tasks={todayTasks?.in_progress?.items}
            icon={KANBAN_STATUS[1].icon}
            count={todayTasks?.in_progress?.count}
          />
        </div>

        {/* Overdue Tasks */}
        <div className="mt-6 bg-muted-foreground/30 rounded-md">
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="h-0 text-base flex items-center justify-between  text-red-900">
              <div className="flex items-center gap-2">
                <Siren className="w-5 h-5 text-red-300" />
                <span className="font-semibold text-lg text-red-300">
                  Overdue
                </span>
              </div>
              <span className="text-sm text-red-300">{totalOverdue} tasks</span>
            </SidebarGroupLabel>
          </SidebarGroup>

          <StatusGroup
            title="To Do"
            tasks={overdueTasks?.todo?.items}
            icon={KANBAN_STATUS[0].icon}
            showDate={true}
            count={overdueTasks?.todo?.count}
          />

          <StatusGroup
            title="In Progress"
            tasks={overdueTasks?.in_progress?.items}
            icon={KANBAN_STATUS[1].icon}
            showDate={true}
            count={overdueTasks?.in_progress?.count}
          />
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
