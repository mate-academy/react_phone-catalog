import { useRef, useState, useEffect } from 'react';
import styles from './ProductPhotos.module.scss';

type Props = {
  images: string[];
};

export const ProductPhotos: React.FC<Props> = ({ images }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) {
      return;
    }

    const width = sliderRef.current.offsetWidth;

    sliderRef.current.scrollTo({
      left: index * width,
      behavior: 'auto',
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
    <div className={styles.photos}>
      <div className={styles.photos_main} ref={sliderRef}>
        {images.map((img, index) => (
          <div key={img} className={styles.photos_slide}>
            <img
              src={`/${img}`}
              alt={`Product image ${index + 1}`}
              className={styles.photos_mainImg}
            />
          </div>
        ))}
      </div>

      <div className={styles.photos_previews}>
        {images.map((img, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={img}
              className={styles.photos_previewBtn}
              onClick={() => scrollToIndex(index)}
              aria-label={`Preview ${index + 1}`}
            >
              <div
                className={`${styles.photos_previewBox}
                ${isActive ? styles['photos_previewBox--active'] : ''}`}
              >
                <img
                  src={`/${img}`}
                  alt={`Preview ${index + 1}`}
                  className={styles.photos_previewImg}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
