import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor - global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    if (error.response?.status !== 404) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

// Parking Slot Services
export const slotService = {
  getAll: (params = {}) => api.get("/slots", { params }),
  getById: (id) => api.get(`/slots/${id}`),
  getStats: () => api.get("/slots/stats"),
  create: (data) => api.post("/slots", data),
  delete: (id) => api.delete(`/slots/${id}`),
  parkVehicle: (data) => api.post("/slots/park", data),
  removeVehicle: (id) => api.put(`/slots/${id}/remove`),
};

export default api;
