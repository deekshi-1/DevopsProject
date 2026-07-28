import { useState, useEffect } from 'react'
import { healthCheck } from "./api";
import './App.css'

function App() {
  const [message, setMessage] = useState("Loading...");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Fetch data from the backend when the component loads
  useEffect(() => {
  healthCheck()
    .then((data) => {
      setMessage(
        `Backend Status: ${data.status}`
      );
    })
    .catch(() => {
      setMessage("Backend Error");
    });
}, []);

  const addNote = () => {
    if (note.trim() === "") return;

    setNotes([...notes, note]);
    setNote("");
  };

  const removeNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <>
      <section id="center">

        <div>
          <h1>Notes</h1>
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
          />

          <button onClick={addNote}>Add</button>
        </div>

        <ul className="notes-list">
          {notes.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
              <button onClick={() => removeNote(index)}>X</button>
            </li>
          ))}
        </ul>

      </section>

      <div className="ticks"></div>
    </>
  )
}

export default App