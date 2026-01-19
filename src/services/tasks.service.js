import axiosInstance from "@/lib/axiosInstance";

class TaskService {
  static async create(body) {
    const res = await axiosInstance.post("/tasks", {
        ...body
    }, {
      timeout: 60000,
    });
    return res.data;
  }

  static async getSidebar(pageId) {
    const res = await axiosInstance.get(`/tasks/sidebar/${pageId}`, {
      timeout: 60000,
    });
    return res.data;
  }

  static async edit(taskId, body) {
    const res = await axiosInstance.put(`/tasks/${taskId}`, {
      ...body
    }, {
      timeout: 60000,
    });
    return res.data;
  }

  static async delete(taskId) {
    const res = await axiosInstance.delete(`/tasks/${taskId}`, {
      timeout: 60000,
    });
    return res.data;
  }
}

export default TaskService;