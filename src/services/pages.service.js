import axiosInstance from "@/lib/axiosInstance";

class PageService {
  static async getTaskByPage(page_id) {
    const res = await axiosInstance.get(
      `/pages/${encodeURIComponent(page_id)}/tasks`,
      {
        timeout: 60000,
      },
    );
    return res.data;
  }

  static async getPageList(user_id) {
    const res = await axiosInstance.get(
      `/pages/${encodeURIComponent(user_id)}`,
      {
        timeout: 60000,
      },
    );
    return res.data;
  }

  static async updatePageTitle(page_id, title) {
    const res = await axiosInstance.put(
      `/pages/${encodeURIComponent(page_id)}/title`,
      { title },
      {
        timeout: 60000,
      },
    );
    return res.data;
  }
}

export default PageService;
