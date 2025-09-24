import { useRef, useState, useEffect } from 'react';
import styles from './ProductGallery.module.scss';

type Props = {
  images: string[];
};

export const ProductGallery: React.FC<Props> = ({ images }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) {
      return;
    }

    const width = sliderRef.current.offsetWidth;

    sliderRef.current.scrollTo({
      left: index * width,
      behavior: 'smooth',
    });

    setActiveIndex(index);
  };

  const handleScroll = () => {
    if (!sliderRef.current) {
      return;
    }

    const scrollLeft = sliderRef.current.scrollLeft;
    const width = sliderRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);

    setActiveIndex(index);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.addEventListener('scroll', handleScroll);

    return () => slider.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__main} ref={sliderRef}>
        {images.map((img, index) => (
          <div key={img} className={styles.gallery__slide}>
            <img
              src={`./${img}`}
              alt={`Product image ${index + 1}`}
              className={styles.gallery__mainImage}
            />
          </div>
        ))}
      </div>

      <div className={styles.gallery__previews}>
        {images.map((img, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={img}
              className={styles.gallery__previewBtn}
              onClick={() => scrollToIndex(index)}
              aria-label={`Preview ${index + 1}`}
            >
              <div
                className={`${styles.gallery__previewBox} ${
                  isActive ? styles['gallery__previewBox--active'] : ''
                }`}
              >
                <img
                  src={`./${img}`}
                  alt={`Preview ${index + 1}`}
                  className={styles.gallery__previewImg}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
