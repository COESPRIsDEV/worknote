import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import './App.css';

import NotesContainer from './NotesContainer';
import NavBar from './NavBar';
import data from './assets/data';

const guardarEnLocalStorage = (datos) => {
  localStorage.setItem('notes', JSON.stringify(datos)); // Convertir array a JSON
};

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

  useEffect(() => {
    const datosGuardados = localStorage.getItem('notes');
    if (datosGuardados) {
      setNotes(JSON.parse(datosGuardados));
    }
  }, []);

  const createNote = () => {
    const id = uuid(5);
    const lastNote = notes.findLastIndex((i) => i);
    setActive(lastNote + 1);

    const nuevasNotas = [
      ...notes,
      { id: id, title: 'New Note*', content: '', color: '#000000', images: [] },
    ];
    setNotes(nuevasNotas);
    guardarEnLocalStorage(nuevasNotas);
    toast.success('Nueva nota creada con éxito', success);
  };

  const updateNotes = (current) => {
    const newNotes = notes.map((entry) =>
      current.id === entry.id ? current : entry
    );
    setNotes(newNotes);
    guardarEnLocalStorage(newNotes);
    toast.success('Nota Guardada', success);
  };

  const changeActive = (index) => {
    setActive(index);
  };

  const deleteNote = (id) => {
    if (confirm('Se eliminará esta nota de manera permanente')) {
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
      guardarEnLocalStorage(newNotes);
      toast.error('Nota Eliminada', success);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="card">
        <h1>
          <img src="./Icono.svg" className="image" />
          Note Redux --//
        </h1>
        <NavBar
          notes={notes}
          createNote={createNote}
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
