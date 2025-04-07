import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import './App.css';

import NotesContainer from './NotesContainer';
import NavBar from './NavBar';

function App() {
  const [active, setActive] = useState(0);
  const [notes, setNotes] = useState([
    {
      id: '67eee00665820960a742abcc',
      title: 'Williamson Noel',
      content:
        'Est duis sunt culpa labore commodo ut in dolor ipsum. Dolore veniam ex adipisicing velit et nisi velit. Pariatur irure minim nisi amet ut adipisicing elit.\r\n',
      color: '#9400d3',
      images: [],
    },
    {
      id: '67eee006b38c8d0746ab3e2d',
      title: 'Bernadette Mcmahon',
      content:
        'Officia labore in consequat fugiat velit incididunt dolore elit ullamco et mollit do. Qui ea id reprehenderit duis. Est est enim anim exercitation eu enim. Dolore cupidatat culpa enim tempor tempor commodo eiusmod sunt quis voluptate commodo deserunt. Enim exercitation fugiat excepteur fugiat dolore laborum.\r\n',
      color: '#40eb34',
      images: [],
    },
  ]);

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

  const newNote = (title, content) => {
    setNotes([...notes, { title: title, content: content }]);
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
