import { useState, useEffect } from 'react'
import { healthCheck, fetchNotes, createNote, deleteNote } from "./api";
import './App.css'

function App() {
  const [message, setMessage] = useState("Loading...");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([healthCheck(), fetchNotes()])
      .then(([health, data]) => {
        setMessage(`Backend Status: ${health.status}`);
        setNotes(data);
      })
      .catch(() => {
        setMessage("Backend Error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addNote = async () => {
    if (note.trim() === "") return;

    try {
      const created = await createNote(note.trim());
      setNotes((prev) => [created, ...prev]);
      setNote("");
    } catch {
      setMessage("Backend Error");
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((item) => item._id !== id));
    } catch {
      setMessage("Backend Error");
    }
  };

  return (
    <>
      <section id="center">

        <div>
          <h1>Notes</h1>
          <p>{message}</p>
        </div>

        <div className="note-input">
          <input
            type="text"
            placeholder="Enter a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
            }}
            disabled={loading}
          />

          <button onClick={addNote} disabled={loading}>Add</button>
        </div>

        <ul className="notes-list">
          {notes.map((item) => (
            <li key={item._id}>
              <span>{item.message}</span>
              <button onClick={() => removeNote(item._id)}>X</button>
            </li>
          ))}
        </ul>

      </section>

      <div className="ticks"></div>
    </>
  )
}

export default App
