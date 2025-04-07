import { useState } from 'react';
import NoteBody from './NoteBody';
import NoteHeader from './NoteHeader';
import { useEffect } from 'react';

function NotesContainer({ deleteNote, active, note, updateNotes }) {
  const [current, setCurrent] = useState(note[active]);

  //la variable de arriba se inicializa con un valor, y si queremos hacer que se actualice
  //es necesario el uso de useEffect
  useEffect(() => {
    setCurrent(note[active] ? note[active] : note[0]);
  }, [active, note]);

  const updateContent = (newContent) => {
    const newCurrent = {
      id: current.id,
      title: current.title,
      content: newContent,
      color: current.color,
      images: current.images,
    };
    setCurrent(newCurrent);
  };
  const updateTitle = (newTitle) => {
    const newCurrent = {
      id: current.id,
      title: newTitle,
      content: current.content,
      color: current.color,
      images: current.images,
    };
    setCurrent(newCurrent);
  };
  const updateColor = (color) => {
    const newCurrent = {
      id: current.id,
      title: current.title,
      content: current.content,
      color: color,
      images: current.images,
    };
    setCurrent(newCurrent);
  };

  if (current) {
    return (
      <div className="notes-container">
        <NoteHeader
          current={current}
          deleteNote={deleteNote}
          updateTitle={updateTitle}
          updateColor={updateColor}
        />
        <NoteBody
          current={current}
          updateContent={updateContent}
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
