async function request(url, options = {}) {
  const response = await fetch(url, options);

<<<<<<< HEAD
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000/api/notes", // Change if needed
});

export const getNotes = async () => {
  const res = await API.get("/");
  return res.data.data;
};

export const createNote = async (message) => {
  const res = await API.post("/", { message });
  return res.data.data;
};

export const deleteNote = async (id) => {
  await API.delete(`/${id}`);
};
=======
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export async function healthCheck() {
  return request("/api/healthcheck");
}

export async function fetchNotes() {
  const json = await request("/api/notes");
  return json.data;
}

export async function createNote(message) {
  const json = await request("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return json.data;
}

export async function deleteNote(id) {
  await request(`/api/notes/${id}`, { method: "DELETE" });
}
>>>>>>> 91afe341044f87c3402b5cd3099ffd6e9ae8835a
