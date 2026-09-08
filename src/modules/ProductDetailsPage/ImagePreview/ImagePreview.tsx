import React, { useState } from 'react';
import styles from './ImagePreview.module.scss';
import classNames from 'classnames';

interface ImagePreviewProps {
  images: string[];
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const selectImage = (imageIndex: number) => {
    setCurrentImage(imageIndex);
  };

  // images 'image1' 'image2' 'image3'
  // current image = 2 = image3
  return (
    <div className={styles.imagePreview__Container}>
      <ul className={styles.imagePreview__ImageList}>
        {images.map((image, index) => (
          <li
            key={index}
            className={classNames([styles.imagePreview__ImageContainer], {
              [styles.imagePreview__ImageContainerActive]:
                index === currentImage,
            })}
            onClick={() => selectImage(index)}
          >
            <img src={image} className={styles.imagePreview__Image} />
          </li>
        ))}
      </ul>
      <div className={styles.imagePreview__CurrentContainer}>
        <img
          src={images[currentImage]}
          className={styles.imagePreview__CurrentImage}
        />
      </div>
    </div>
  );
};
