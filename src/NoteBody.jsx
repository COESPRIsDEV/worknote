import { FaCamera } from 'react-icons/fa6';
import { FaPaperclip } from 'react-icons/fa';
import { FaRegSave } from 'react-icons/fa';
import { useEffect } from 'react';

function NoteBody({ current, updateContent, updateNotes }) {
  useEffect(() => {
    window.addEventListener('paste', (e) => {
      //TODO:
      // e.clipboardData.files;
    });

    return () => {
      window.removeEventListener('paste');
    };
  }, []);

  return (
    <div className="note-body">
      <textarea
        type="text"
        className="upper-body"
        value={current.content}
        onChange={(e) => updateContent(e.target.value)}
      ></textarea>
      <div className="lower-body">
        <button type="button" className="btn">
          <FaCamera />
        </button>
        <label for="file-upload" className="btn custom-file-upload">
          <FaPaperclip />
        </label>
        <input
          id="file-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
        <button
          type="button"
          className="btn save"
          onClick={() => updateNotes(current)}
        >
          <FaRegSave />
        </button>
      </div>
    </div>
  );
}
export default NoteBody;
