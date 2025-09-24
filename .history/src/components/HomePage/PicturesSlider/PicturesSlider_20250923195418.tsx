import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import classNames from 'classnames';

export const PicturesSlider = () => {
  const [images] = useState([
    './images/banner/iPnone16Pro.png',
    './images/banner/iPadPro.png',
    './images/banner/MacBookAir.png',
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getLinkClass = (isActive: boolean) =>
    classNames(styles.dash, { [styles.active]: isActive });

  const handlePrevPhoto = () => {
    setSelectedPhoto(index => (index === 0 ? images.length - 1 : index - 1));
  };

  const handleNextPhoto = useCallback(() => {
    setSelectedPhoto(index => (index === images.length - 1 ? 0 : index + 1));
  }, [images.length]);

  const autoSwitch = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(handleNextPhoto, 5000);
  }, [handleNextPhoto]);

  useEffect(() => {
    autoSwitch();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoSwitch]);

  return (
    <>
      <div className={styles.container}>
        <h1 hidden>Product Catalog</h1>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

        <div className={styles.picturesslider}>
          <button
            className={styles.button}
            onClick={() => {
              handlePrevPhoto();
              autoSwitch();
            }}
          >
            <img className={styles.prev} src="images/Vector Left.svg" />
          </button>

          <img
            key={images[selectedPhoto]}
            src={images[selectedPhoto]}
            className={styles.pictures}
            alt={images[selectedPhoto]}
          />

          <button
            className={styles.button}
            onClick={() => {
              handleNextPhoto();
              autoSwitch();
            }}
          >
            <img className={styles.next} src="images/Vector Right.svg" />
          </button>
        </div>
      </div>
      <div className={styles.slider}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedPhoto(index);
              autoSwitch();
            }}
            className={getLinkClass(selectedPhoto === index)}
          />
        ))}
      </div>
    </>
  );
};
