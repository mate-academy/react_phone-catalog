import { useEffect, useState } from 'react';

import cn from 'classnames';
import styles from './ProductImageCarousel.module.scss';

interface ProductImageCarouselProps {
  images: string[];
}

export const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className={styles.carousel}>
      <ul className={styles.carousel__mini}>
        {images.map((image, idx) => (
          <li
            key={idx}
            onClick={() => setSelectedImage(image)}
            className={cn(styles.carousel__mini_item, {
              [styles.selected]: selectedImage === image,
            })}
          >
            <img
              className={styles.carousel__mini_img}
              src={image}
              alt={`Thumbnail ${idx + 1}`}
            />
          </li>
        ))}
      </ul>

      <div className={styles.carousel__main}>
        <img src={selectedImage} alt="Selected product" />
      </div>
    </div>
  );
};
