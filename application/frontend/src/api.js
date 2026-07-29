async function request(url, options = {}) {
  const response = await fetch(url, options);

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
