import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskService from "@/services/tasks.service";
import { toast } from "sonner";

export const useCreateTask = (page_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TaskService.create,

    onMutate: () => {
      toast.loading("Creating task...", { id: "create-task" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page"] }); // refetch data
      queryClient.invalidateQueries({ queryKey: ["sidebar", page_id] }); // refetch data

      toast.success("Task created successfully", {
        id: "create-task",
        duration: 5000,
        closeButton: true,
      });
    },
    
    onError: (error) => {
      toast.error("Failed to create task", { id: "create-task" });
      console.error(error);
    },
  });
};

export const useDeleteTask = (page_Id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId) => TaskService.delete(taskId),

    onMutate: () => {
      toast.loading("Deleting task...", { id: "delete-task" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page"] }); // refetch data
      queryClient.invalidateQueries({ queryKey: ["sidebar", page_Id] }); // refetch data

      toast.success("Task deleted", {
        id: "delete-task",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Delete failed", { id: "delete-task" });
      console.error(error);
    },
  });
};

export const useEditTask = (page_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }) => TaskService.edit(id, body),

    onMutate: () => {
      toast.loading("Editing task...", { id: "edit-task" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page"] }); // refetch data
      queryClient.invalidateQueries({ queryKey: ["sidebar", page_id] }); // refetch data

      toast.success("Task edited", {
        id: "edit-task",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Edit failed", { id: "edit-task" });
      console.error(error);
    },
  });
};

export const useGetSidebarByPage = (page_id) => {
 const query = useQuery({
    queryKey: ["sidebar", page_id],
    queryFn: () => TaskService.getSidebar(page_id),
    enabled: !!page_id,
    refetchOnWindowFocus: false,
  });

  return query;
}