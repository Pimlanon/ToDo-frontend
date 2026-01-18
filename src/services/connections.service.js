import axiosInstance from "@/lib/axiosInstance";

class ConnectionService {
    static async create(body) {
        const res = await axiosInstance.post("/connections", {
            ...body
        }, {
        timeout: 60000,
        });
        return res.data;
    }
  
  static async getConnectionByPage(page_id) {
    const res = await axiosInstance.get(
      `/connections/${encodeURIComponent(page_id)}`,
      {
        timeout: 60000,
      },
    );
    return res.data;
  }

  static async delete(connectionId) {
    const res = await axiosInstance.delete(`/connections/${connectionId}`, {
      timeout: 60000,
    });
    return res.data;
  }
}

export default ConnectionService;
