import React, { useState, useEffect } from 'react';
import { GalleryThumbnails } from './GalleryThumbnails';

export const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const [currentImageLink, setCurrentImageLink] = useState<string>(images[0]);

  useEffect(() => {
    setCurrentImageLink(images[0])
  }, [images]);

  const setActiveImage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { src } = e.target as HTMLImageElement;

    if (src) {
      setCurrentImageLink(src);
    }
  };

  return (
    <div className="gallery">
      <GalleryThumbnails
        images={images}
        title={title}
        handleClick={setActiveImage}
        currentImageLink={currentImageLink}
      />
      <div className="gallery__photo gallery__photo--lg">
        <img
          src={currentImageLink}
          alt={title}
          className="gallery__img"
        />
      </div>
    </div>
  );
};
