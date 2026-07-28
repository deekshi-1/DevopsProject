import { useState, useEffect } from "react";
import { getNotes, createNote, deleteNote } from "./api";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
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
    }
  };

  return (
    <>
      <section id="center">
        <h1>Notes</h1>

        <div className="note-input">
          <input
            type="text"
            placeholder="Enter a note..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
            }}
          />

          <button onClick={addNote}>Add</button>
        </div>

        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note._id}>
              <span>{note.message}</span>

              <button onClick={() => removeNote(note._id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="ticks"></div>
    </>
  );
}

export default App;