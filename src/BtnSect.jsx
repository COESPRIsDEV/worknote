import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { FaCamera } from 'react-icons/fa6';
import { FaPaperclip } from 'react-icons/fa';
import { FaRegSave } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

const ButtonsSection = ({ updateNotes, current, updateCurrent }) => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataURL = e.target.result; // Convierte el archivo en un Data URL

        // Ajusta la estructura de datos para agregar la nueva imagen
        const newImages = [...current.images, { src: dataURL }];

        // Actualiza el estado con la nueva imagen
        updateCurrent('images', newImages);
        toast.info('Imagen Cargada con exito', success);
      };

      reader.readAsDataURL(file); // Inicia la conversión
    }
  };

  const openCamera = async () => {
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(cameraStream); // Guarda el stream en el estado
      setCameraActive(true); // Activa la cámara para renderizar el video
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Cámara No Detectada', success);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setStream(null); // Limpia el stream
  };

  const takePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Obtener el tamaño del video
    const { videoWidth, videoHeight } = videoRef.current;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Dibujar el frame actual en el canvas
    ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

    // Convertir el canvas a Data URL
    const photoDataURL = canvas.toDataURL('image/jpeg', 0.8);

    // Agregar la imagen capturada a la lista de imágenes
    const newImages = [...current.images, { src: photoDataURL }];
    updateCurrent('images', newImages);
    toast.info('Foto tomada', success);
  };

  useEffect(() => {
    if (cameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream; // Enlaza el stream al <video>
      videoRef.current.play();
    }
  }, [cameraActive, stream]); // Se ejecuta cada vez que la cámara se activa o el stream cambia

  return (
    <div className="lower-body">
      {cameraActive ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '400px', border: '2px solid black' }}
          ></video>
          <button onClick={closeCamera} className="btn">
            <IoClose />
          </button>
          <button onClick={takePhoto} className="btn">
            <MdOutlineAddPhotoAlternate />
          </button>
        </>
      ) : (
        <>
          <button onClick={openCamera} className="btn">
            <FaCamera />
          </button>
          <label htmlFor="file-upload" className="btn custom-file-upload">
            <FaPaperclip />
          </label>
          <input
            id="file-upload"
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="btn save"
            onClick={() => updateNotes(current)}
          >
            <FaRegSave />
          </button>
        </>
      )}
    </div>
  );
};

export default ButtonsSection;
