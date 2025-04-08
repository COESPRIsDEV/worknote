import { FaPlus } from 'react-icons/fa';

function NavBar({ notes, createNote, changeActive, active }) {
  return (
    <div>
      <NavAdd createNote={createNote} />
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
      <span className="text">{note.title}</span>
    </button>
  );
};

const NavAdd = ({ createNote }) => {
  return (
    <button className="plus" type="button" onClick={() => createNote()}>
      <FaPlus />
    </button>
  );
};
export default NavBar;
