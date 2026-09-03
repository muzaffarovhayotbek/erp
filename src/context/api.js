const BASE = import.meta.env.VITE_API_BASE_URL || "";

export const apiFetch = (url, options = {}) => {
  const token = localStorage.getItem("access");

  return fetch(`${BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });
};