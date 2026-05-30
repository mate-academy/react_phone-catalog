import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import styles from './PictureSlider.module.scss';

const SLIDER_IMAGES = [
  'img/picture-slider/slider-picture-1.webp',
  'img/picture-slider/slider-picture-2.webp',
  'img/picture-slider/slider-picture-3.webp',
];

const SLIDER_IMAGES_MOBILE = [
  'img/picture-slider/slider-picture-1-mobile.webp',
  'img/picture-slider/slider-picture-2-mobile.webp',
  'img/picture-slider/slider-picture-3-mobile.webp',
];

export const PictureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visiblPictures = size < 640 ? SLIDER_IMAGES_MOBILE : SLIDER_IMAGES;

  const prevSlide = () => {
    setCurrentIndex(
      prev => (prev - 1 + visiblPictures.length) % visiblPictures.length,
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % visiblPictures.length);
  };

  const startX = useRef(0);
  const isDragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) {
      return;
    }

    isDragging.current = false;

    const diff = startX.current - e.clientX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={styles.pictureSlider}>
      <Button
        textContent=""
        className={['arrow', 'pictureSlider']}
        onClick={() => prevSlide()}
      />

      <div
        className={styles.pictureSlider__slider}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <ul
          className={styles.pictureSlider__list}
          style={{
            transition: 'transform 0.4s ease',
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {visiblPictures.map(image => (
            <li key={image} className={styles.pictureSlider__item}>
              <img
                src={image}
                alt="banner image"
                className={styles.pictureSlider__img}
              />
            </li>
          ))}
        </ul>
      </div>

      <Button
        textContent=""
        className={['arrow', 'arrow--right', 'pictureSlider']}
        onClick={() => nextSlide()}
      />

      <ul className={styles.pictureSlider__pagination}>
        {visiblPictures.map((pic, index) => (
          <li key={pic} className={styles.pictureSlider__paginationItem}>
            <button
              disabled={index === currentIndex}
              className={`${styles.pictureSlider__paginationBtn} ${
                index === currentIndex
                  ? styles['pictureSlider__paginationBtn--active']
                  : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
