const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Une erreur est survenue.");
  }
  return response.json();
}

export const api = {
  categories: () => request("/categories"),
  topArtisans: () => request("/artisans/top"),
  artisans: ({ category = "", search = "" } = {}) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    return request(`/artisans?${params.toString()}`);
  },
  artisan: (id) => request(`/artisans/${id}`),
  contact: (id, payload) => request(`/artisans/${id}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
};
