import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import './App.css';

import NotesContainer from './NotesContainer';
import NavBar from './NavBar';
import data from './assets/data';

function App() {
  const [active, setActive] = useState(0);
  const [notes, setNotes] = useState(data);

  const success = {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  };

  const newNote = () => {
    console.log('click');

    const id = uuid(5);
    setNotes([
      ...notes,
      { id: id, title: 'New Note', content: '', color: '#000000', images: [] },
    ]);

    toast.success('Nueva nota creada con exito', success);
  };

  const updateNotes = (current) => {
    const newNotes = notes.map((entry) => {
      if (current.id === entry.id) {
        return current;
      } else {
        return entry;
      }
    });
    setNotes(newNotes);
    toast.success('Nota Guardada', success);
  };

  const changeActive = (index) => {
    setActive(index);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note.id != id;
    });
    if (confirm('Se eliminara esta nota de manera permanente') === true) {
      setNotes(newNotes);
      toast.error('Nota Eliminada', success);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="card">
        <h1>Note Redux:</h1>
        <NavBar
          notes={notes}
          newNote={newNote}
          changeActive={changeActive}
          active={active}
          toast={toast}
        />
        <NotesContainer
          active={active}
          note={notes}
          deleteNote={deleteNote}
          updateNotes={updateNotes}
        />
      </div>
    </>
  );
}

export default App;
