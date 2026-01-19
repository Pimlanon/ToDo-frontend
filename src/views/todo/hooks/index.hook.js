import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useGetPageList,
  useGetTaskByPage,
  useUpdatePageTitle,
} from "@/queries/pages.queries";
import { useEditTask } from "@/queries/tasks.queries";
import { useGetConnectionByPage } from "@/queries/connections.queries";
import { usePageStore } from "@/stores/usePageStore";

export function useIndexKanbanBoard() {
  const [board, setBoard] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");

  const { setPageId } = usePageStore();
  const debouncedTitle = useDebounce(title, 3000);
  
  // -- query api --
  const { data: pageList } = useGetPageList();
  const pageId = pageList?.items?.[0]?.id;
  
  const editTaskMutation = useEditTask(pageId);
  const updateTitle = useUpdatePageTitle(pageId);
  
  const { data: taskData, isLoading: isTaskLoading } = useGetTaskByPage(pageId);
  const { data: connectionData } = useGetConnectionByPage(pageId);

  // init title when page load
  useEffect(() => {
    if (pageList?.items?.[0]?.title) {
      setTitle(pageList.items[0].title);
    }
  }, [pageList]);

  // load tasks into board
  useEffect(() => {
    if (taskData) {
      setBoard(taskData?.tasks);
    }
  }, [taskData]);

  // set id to store
  useEffect(() => {
    if (pageId) setPageId(pageId);
  }, [pageId]);

  // autosave title of page
  useEffect(() => {
    if (!debouncedTitle || !pageId) return;
    updateTitle.mutate(debouncedTitle);
  }, [debouncedTitle, pageId]);

  return {
    board,
    setBoard,
    editingTask,
    setEditingTask,
    pageId,
    title,
    setTitle,
    editTaskMutation,
    isTaskLoading,
    connections: connectionData,
  };
}
