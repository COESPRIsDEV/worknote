import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ImageList = ({ images, updateCurrent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const deleteImage = () => {
    if (images.length === 0) return;

    // Mostrar una confirmación antes de eliminar
    const confirmDelete = window.confirm(
      `Are you sure you want to delete image ${currentIndex + 1} of ${
        images.length
      }?`
    );

    if (confirmDelete) {
      const updatedImages = images.filter((_, index) => index !== currentIndex);

      // Usamos updateCurrent para actualizar las imágenes
      updateCurrent('images', updatedImages);

      // Ajustar índice actual si se elimina la última imagen
      if (currentIndex >= updatedImages.length) {
        setCurrentIndex(0);
      }

      // Mostrar notificación usando toast
      toast.error('Imagen Eliminada', success);
    } else {
      // Notificación si el usuario cancela la eliminación
      toast.info('Eliminación De Imagen Cancelada', success);
    }
  };

  return (
    <div className="images-container">
      {images.length > 0 ? (
        <>
          <ImageInfo
            currentIndex={currentIndex}
            totalImages={images.length}
            deleteImage={deleteImage}
          />
          <div className="carousel">
            <button className="prev-btn" onClick={prevImage}>
              ❮
            </button>
            <Image key={uuid()} image={images[currentIndex].src} />
            <button className="next-btn" onClick={nextImage}>
              ❯
            </button>
          </div>
        </>
      ) : (
        <span className="text">There aren't any images</span>
      )}
    </div>
  );
};

const Image = ({ image }) => {
  return (
    <div className="image-wrapper">
      <img src={image} alt="image" className="image" />
    </div>
  );
};

const ImageInfo = ({ currentIndex, totalImages, deleteImage }) => {
  return (
    <>
      <div className="image-info">
        <span>
          {currentIndex + 1} of {totalImages}
        </span>
      </div>
      <button className="trash-Btn image" type="button" onClick={deleteImage}>
        <FaRegTrashAlt />
      </button>
    </>
  );
};

export default ImageList;
