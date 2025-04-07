import { useState } from 'react';
import NoteBody from './NoteBody';
import NoteHeader from './NoteHeader';
import { useEffect } from 'react';

function NotesContainer({ deleteNote, active, note, updateNotes }) {
  const [current, setCurrent] = useState(note[active]);

  //Actualiza current cada vez que se renderiza el componente
  useEffect(() => {
    setCurrent(note[active] ? note[active] : note[0]);
  }, [active, note]);

  const updateCurrent = (field, newData) => {
    const newCurrent = {
      ...current,
      [field]: newData,
    };
    setCurrent(newCurrent);
  };

  if (current) {
    return (
      <div className="notes-container">
        <NoteHeader
          current={current}
          deleteNote={deleteNote}
          updateCurrent={updateCurrent}
        />
        <NoteBody
          current={current}
          updateCurrent={updateCurrent}
          updateNotes={updateNotes}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h3>There are no entries here</h3>
      </div>
    );
  }
}
export default NotesContainer;
