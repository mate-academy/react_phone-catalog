import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import { Slider } from '../Slider';
import { NavButton } from '../../../shared/components/NavButton';

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { img: './img/image/SliderImg/1.png', alt: 'Img1' },
    { img: './img/image/SliderImg/2.png', alt: 'Img2' },
    { img: './img/image/SliderImg/3.png', alt: 'Img3' },
    { img: './img/image/SliderImg/4.png', alt: 'Img4' },
  ];

  const goNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.picturesSlider}>
      <div className={styles.sliderTrack}>
        <NavButton
          onClick={goPrev}
          childrenValue={'./img/image/Icons/VectorLeft.svg'}
          slider={true}
        />
        <Slider
          image={images[currentIndex].img}
          alt={images[currentIndex].alt}
        />
        <NavButton
          onClick={goNext}
          childrenValue={'./img/image/Icons/VectorRight.svg'}
          slider={true}
        />
      </div>

      <div className={styles.pagination}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ''
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
