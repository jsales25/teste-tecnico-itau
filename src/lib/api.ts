async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(endpoint, config);

  if (response.status === 401 && typeof window !== "undefined") {
    
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Algo deu errado");
  }

  return data;
}

export const api = {
  get: (url: string) => apiFetch(url, { method: "GET" }),
  post: (url: string, body: any) => apiFetch(url, { method: "POST", body: JSON.stringify(body) }),
  patch: (url: string, body: any) => apiFetch(url, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (url: string) => apiFetch(url, { method: "DELETE" }),
};
