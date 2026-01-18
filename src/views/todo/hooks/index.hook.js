import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {  useGetPageList, useGetTaskByPage, useUpdatePageTitle } from "@/queries/pages.queries";
import { useEditTask } from "@/queries/tasks.queries";
import { useGetConnectionByPage } from "@/queries/connections.queries";

export function useIndexKanbanBoard(userId) {
  const [board, setBoard] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");
  const [connections, setConnections] = useState({});

  const editTaskMutation = useEditTask(userId);
  const { data: pageList } = useGetPageList(userId);
  const pageId = pageList?.items?.[0]?.id;

  const debouncedTitle = useDebounce(title, 3000);
  const updateTitle = useUpdatePageTitle(pageId);

  const { data: taskData, isLoading: isTaskLoading } = useGetTaskByPage(pageId);

  const { data: connectionData } = useGetConnectionByPage(pageId);

  // init title when page load
  useEffect(() => {
    if (pageList?.items?.[0]?.title) {
      setTitle(pageList.items[0].title);
    }
  }, [pageList]);

  // autosave title of page
  useEffect(() => {
    if (!debouncedTitle || !pageId) return;
    updateTitle.mutate(debouncedTitle);
  }, [debouncedTitle, pageId]);

  // load tasks into board
  useEffect(() => {
    if (taskData) {
      setBoard(taskData.tasks);
    }
  }, [taskData]);

  useEffect(() => {
    if (connectionData) {
      setConnections(connectionData);
    }
  }, [connectionData]);

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
    connections,
  };
}