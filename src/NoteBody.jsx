import { useEffect } from 'react';
import { toast } from 'react-toastify';

import ImageList from './ImageList';
import ButtonsSection from './BtnSect';

function NoteBody({ current, updateCurrent, updateNotes }) {
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
    const handlePaste = (e) => {
      if (!e.clipboardData || !e.clipboardData.items) return;

      const items = e.clipboardData.items;
      for (let item of items) {
        if (item.type.startsWith('image')) {
          const archivoTemporal = item.getAsFile();
          const reader = new FileReader();

          reader.onload = (event) => {
            const imagenPegada = [
              ...current.images,
              { src: event.target.result }, // Guarda la imagen pegada como dataURL
            ];
            updateCurrent('images', imagenPegada);
            toast.info('Imagen Pegada desde el portapapeles', success);
          };

          reader.readAsDataURL(archivoTemporal); // Convierte la imagen en dataURL
          e.preventDefault(); // Previene el comportamiento de pegado predeterminado
        }
      }
    };

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [current.images, updateCurrent, success]);

  return (
    <div className="note-body">
      <textarea
        type="text"
        className="upper-body"
        style={{ height: '97%' }}
        value={current.content}
        onChange={(e) => updateCurrent('content', e.target.value)}
      ></textarea>
      <ImageList images={current.images} />
      <ButtonsSection
        updateNotes={updateNotes}
        current={current}
        updateCurrent={updateCurrent}
      />
    </div>
  );
}

export default NoteBody;
