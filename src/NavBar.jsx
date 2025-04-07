import { FaPlus } from 'react-icons/fa';

function NavBar({ notes, newNote, changeActive, active }) {
  return (
    <div>
      <NavAdd newNote={newNote} />
      <div className="navbar">
        {notes.map((note, index) => {
          return (
            <NavButton
              key={note.id}
              note={note}
              index={index}
              changeActive={changeActive}
              active={active}
            />
          );
        })}
      </div>
    </div>
  );
}

const NavButton = ({ note, index, changeActive, active }) => {
  return (
    <button
      style={{
        background: `${note.color}`,
        left: `${0 + 7.1 * index}rem`,
      }}
      className={
        active === index ? 'nav-btn object selected' : 'nav-btn object'
      }
      type="button"
      onClick={() => changeActive(index)}
    >
      {note.title}
    </button>
  );
};

const NavAdd = ({ newNote }) => {
  return (
    <button className="plus" type="button" onClick={() => newNote}>
      <FaPlus />
    </button>
  );
};
export default NavBar;
