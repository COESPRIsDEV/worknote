import { v4 as uuid } from 'uuid';
import { useState } from 'react';

import { FaRegTrashAlt } from 'react-icons/fa';

const ImageList = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="images-container">
      {images.length > 0 ? (
        <>
          <ImageInfo currentIndex={currentIndex} totalImages={images.length} />
          <div className="carousel">
            <button className="prev-btn" onClick={prevImage}>
              ❮
            </button>
            <Image key={uuid(4)} image={images[currentIndex].src} />
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

const ImageInfo = ({ currentIndex, totalImages }) => {
  return (
    <>
      <div className="image-info">
        <span>
          {currentIndex + 1} of {totalImages}
        </span>
      </div>
      <button className="trash-Btn image" type="button">
        <FaRegTrashAlt />
      </button>
    </>
  );
};

export default ImageList;
