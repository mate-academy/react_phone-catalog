import React, { useRef } from 'react';
import styles from './ZoomImage.module.scss';

export const ZoomImage = ({ src }: { src: string }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const image = imageRef.current;

    if (!image) {
      return;
    }

    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    const image = imageRef.current;

    if (image) {
      image.style.transform = 'scale(1.4)';
    }
  };

  const handleMouseLeave = () => {
    const image = imageRef.current;

    if (image) {
      image.style.transform = 'scale(1)';
    }
  };

  return (
    <>
      <div className={`${styles.details_main_image_wrapper}`}>
        <img
          ref={imageRef}
          src={src}
          alt="phone image"
          className={`${styles.details_main_image}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </>
  );
};
