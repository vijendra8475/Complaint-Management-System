import api from "@/services/api";

export const getAnalytics =
  async () => {
    const response =
      await api.get(
        "/admin/analytics"
      );

    return response.data;
  };