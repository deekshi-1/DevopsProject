<<<<<<< HEAD
import { useState, useEffect } from "react";
import { getNotes, createNote, deleteNote } from "./api";
import "./App.css";
=======
import { useState, useEffect } from 'react'
import { healthCheck, fetchNotes, createNote, deleteNote } from "./api";
import './App.css'
>>>>>>> 91afe341044f87c3402b5cd3099ffd6e9ae8835a

function App() {
  const [notes, setNotes] = useState([]);
<<<<<<< HEAD
  const [message, setMessage] = useState("");

  // Load notes
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add note
  const addNote = async () => {
    if (!message.trim()) return;

    try {
      const newNote = await createNote(message);
      setNotes([newNote, ...notes]);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // Delete note
  const removeNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.log(err);
=======
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
>>>>>>> 91afe341044f87c3402b5cd3099ffd6e9ae8835a
    }
  };

  return (
    <>
      <section id="center">
<<<<<<< HEAD
        <h1>Notes</h1>
=======

        <div>
          <h1>Notes</h1>
          <p>{message}</p>
        </div>
>>>>>>> 91afe341044f87c3402b5cd3099ffd6e9ae8835a

        <div className="note-input">
          <input
            type="text"
            placeholder="Enter a note..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
            }}
            disabled={loading}
          />

          <button onClick={addNote} disabled={loading}>Add</button>
        </div>

        <ul className="notes-list">
<<<<<<< HEAD
          {notes.map((note) => (
            <li key={note._id}>
              <span>{note.message}</span>

              <button onClick={() => removeNote(note._id)}>
                X
              </button>
=======
          {notes.map((item) => (
            <li key={item._id}>
              <span>{item.message}</span>
              <button onClick={() => removeNote(item._id)}>X</button>
>>>>>>> 91afe341044f87c3402b5cd3099ffd6e9ae8835a
            </li>
          ))}
        </ul>
      </section>

      <div className="ticks"></div>
    </>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App
>>>>>>> 91afe341044f87c3402b5cd3099ffd6e9ae8835a
