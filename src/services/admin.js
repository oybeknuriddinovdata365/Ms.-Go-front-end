import api from "./api";

export const getAdmins = () => api.get("/admin");

export const createAdmin = (data) => api.post("/admin/create", data);

export const updateAdmin = (id, data) => {
  return api.put(`/admin/${id}`, data);
};

export const deleteAdmin = (id) => api.delete(`/admin/${id}`);