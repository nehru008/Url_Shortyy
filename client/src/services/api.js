import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
const TOKEN_KEY = "url_shortyy_access_token";
const USER_KEY = "url_shortyy_user";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const unwrap = (response) => response.data?.data ?? response.data;
const messageFromError = (error) =>
  error.response?.data?.message || error.response?.data?.error || error.message || "Something went wrong";

export const storage = {
  tokenKey: TOKEN_KEY,
  userKey: USER_KEY,
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setSession: ({ token, user }) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser: () => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export const authApi = {
  async login(credentials) {
    const data = unwrap(await apiClient.post("/users/login", credentials));
    const token = data?.accessToken;
    return { token, user: data?.user ?? data };
  },

  async register(formValues) {
    const formData = new FormData();
    formData.append("username", formValues.username);
    formData.append("fullName", formValues.fullName);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    if (formValues.profile) formData.append("profile", formValues.profile);

    const response = await apiClient.post("/users/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return unwrap(response);
  },

  async logout() {
    try {
      return unwrap(await apiClient.post("/users/logout"));
    } finally {
      storage.clearSession();
    }
  },

  async currentUser() {
    // TODO: If your backend route differs or currently errors, update only this path.
    return unwrap(await apiClient.get("/users/current-user"));
  },
};

export const urlApi = {
  async shorten(originalUrl) {
    // TODO: Backend should authenticate this endpoint. If the route changes, update this path only.
    return unwrap(await apiClient.post("/url/shorten", { originalUrl }));
  },

  async history() {
    // TODO: If history is exposed under /users/get-urlHistory or another route, change it here only.
    return unwrap(await apiClient.get("/url/history"));
  },
};

export { apiClient, messageFromError };
