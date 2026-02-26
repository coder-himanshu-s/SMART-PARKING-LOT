import axios from "axios";
import toast from "react-hot-toast";

// Build a safe base URL that always includes `/api`
let apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
// If the URL does not already end with `/api`, append it
if (!/\/api\/?$/i.test(apiUrl)) {
  apiUrl = apiUrl.replace(/\/+$/, "") + "/api";
}
const API_URL = apiUrl;
console.log(`${API_URL} from api.js`);
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
