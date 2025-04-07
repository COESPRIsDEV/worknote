import { FaRegTrashAlt } from 'react-icons/fa';

function NoteHeader({ current, updateTitle, deleteNote, updateColor }) {
  return (
    <div className="notes-header">
      <input
        type="text"
        className="subtitle"
        value={current.title}
        onChange={(e) => updateTitle(e.target.value)}
      />
      <button
        type="button"
        className="trash-Btn"
        onClick={() => deleteNote(current.id)}
      >
        <FaRegTrashAlt />
      </button>
      <input
        type="color"
        name="color"
        id="color"
        className="color-input"
        value={current.color}
        onChange={(e) => updateColor(e.target.value)}
      />
    </div>
  );
}
export default NoteHeader;
