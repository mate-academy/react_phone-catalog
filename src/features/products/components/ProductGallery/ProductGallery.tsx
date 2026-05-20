import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((img, i) => (
          <button
            key={img}
            className={`${styles.thumbnail} ${i === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(i)}
          >
            <img src={`./${img}`} alt={`${name} ${i + 1}`} />
          </button>
        ))}
      </div>
      <div className={styles.mainImage}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={`./${images[activeIndex]}`}
            alt={name}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
