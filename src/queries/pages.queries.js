import PageService from "@/services/pages.service";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetTaskByPage = (page_id) => {
  const query = useQuery({
    queryKey: ["page", page_id],
    queryFn: () => PageService.getTaskByPage(page_id),
    enabled: !!page_id,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useGetPageList = () => {
  const query = useQuery({
    queryKey: ["page-list"],
    queryFn: () => PageService.getPageList(),
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useUpdatePageTitle = (pageId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title) => PageService.updatePageTitle(pageId, title),

    onMutate: () => {},

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page", pageId] }); // refetch data
      queryClient.invalidateQueries({ queryKey: ["pageList"] }); // refetch data
    },

    onError: () => {
      toast.error("Failed to update title", { id: "update-title" });
    },
  });
};
