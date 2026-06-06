import api from "@/services/api";

export const getAllComplaints =
  async () => {
    const response =
      await api.get(
        "/admin/complaints"
      );

    return response.data;
  };

export const updateComplaintStatus =
  async (id, status) => {
    const response =
      await api.patch(
        `/admin/complaints/${id}/status`,
        { status }
      );

    return response.data;
  };

export const updateComplaintRemarks =
  async (id, remarks) => {
    const response =
      await api.patch(
        `/admin/complaints/${id}/remarks`,
        { remarks }
      );

    return response.data;
  };