import React, { useState } from 'react';
import './ProductGallery.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type Props = {
  images: string[];
};

export const ProductGallery: React.FC<Props> = ({ images }) => {
  const mainImage = images[0];
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div className="gallery">
      {images && (
        <div className="gallery__thumbnails">
          {images.map(image => {
            const handleThumbnailLink = (
              e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
            ) => {
              e.preventDefault();

              setSelectedImage(image);
            };

            return (
              <a
                key={image}
                className="gallery__thumbnail"
                href="#/"
                onClick={handleThumbnailLink}
              >
                <img
                  className="gallery__img"
                  src={`./_new/${image}`}
                  alt="Thumbnail"
                />
              </a>
            );
          })}
        </div>
      )}
      <TransitionGroup className="gallery__selected">
        <CSSTransition
          key={selectedImage}
          timeout={200}
          classNames="gallery__transition"
          exit={false}
        >
          <img
            className="gallery__img"
            src={`./_new/${selectedImage}`}
            alt="Main Product"
          />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
