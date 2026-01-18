import ConnectionService from "@/services/connections.service";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateConnection = (page_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ConnectionService.create,

    onMutate: () => {
      toast.loading("Creating connection...", { id: "create-connection" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connection", page_id] }); // refetch data
      
      toast.success("Connection created successfully", {
        id: "create-connection",
        duration: 5000,
        closeButton: true,
      });
    },

    onError: (error) => {
        console.log('error',error)
      toast.error(error?.response?.data?.error || "Create failed", { id: "create-connection" });
      console.error(error);
    },
  });
};

export const useGetConnectionByPage = (page_id) => {
 const query = useQuery({
    queryKey: ["connection", page_id],
    queryFn: () => ConnectionService.getConnectionByPage(page_id),
    enabled: !!page_id,
    refetchOnWindowFocus: false,
  });

  return query;
}

export const useDeleteConnection = (page_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (connectionId) => ConnectionService.delete(connectionId),

    onMutate: () => {
      toast.loading("Deleting connection...", { id: "delete-connection" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connection", page_id] }); // refetch data
      queryClient.invalidateQueries({ queryKey: ["page", page_id] }); // refetch data


      toast.success("Connection deleted", {
        id: "delete-connection",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Delete failed", { id: "delete-connection" });
      console.error(error);
    },
  });
};