import React, { useState, useRef } from 'react';
import './ProductGallery.scss';

type Props = {
  images: string[];
  name: string;
};

type AnimationState = 'idle' | 'exit' | 'enter';

export const ProductGallery: React.FC<Props> = ({ images, name }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [nextImage, setNextImage] = useState<string | null>(null);
  const [animState, setAnimState] = useState<AnimationState>('idle');
  const [prevImages, setPrevImages] = useState(images);

  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (images !== prevImages) {
    setPrevImages(images);
    setActiveImage(images[0]);
    setNextImage(null);
    setAnimState('idle');
  }

  const handleThumbClick = (img: string) => {
    if (img === activeImage || animState !== 'idle') return;

    if (animRef.current) clearTimeout(animRef.current);

    setNextImage(img);
    setAnimState('exit');

    animRef.current = setTimeout(() => {
      setActiveImage(img);
      setAnimState('enter');

      animRef.current = setTimeout(() => {
        setNextImage(null);
        setAnimState('idle');
      }, 300);
    }, 250);
  };

  return (
    <div className="gallery">
      <div className="gallery__thumbs">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumb ${activeImage === img && !nextImage ? 'active' : ''} ${nextImage === img ? 'active' : ''}`}
            onClick={() => handleThumbClick(img)}
          >
            <img
              src={`${import.meta.env.BASE_URL}${img}`}
              alt={`${name} thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="gallery__main">
        <img
          src={`/${activeImage}`}
          alt={name}
          className={`gallery__image gallery__image--${animState}`}
        />
      </div>
    </div>
  );
};
