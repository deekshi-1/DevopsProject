
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