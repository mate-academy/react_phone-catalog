import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import strokeLeft from '../../../../public/img/icons/StrokeLeft.svg';
import strokeRight from '../../../../public/img/icons/StrokeRight.svg';

import image2 from '../../../../public/img/PicturesSlider/Apple55.jpg';
import image4 from '../../../../public/img/PicturesSlider/Apple1.jpg';
import image5 from '../../../../public/img/PicturesSlider/Apple30.jpg';
import image6 from '../../../../public/img/PicturesSlider/Apple18.jpg';
import image7 from '../../../../public/img/PicturesSlider/Apple8.jpg'
import image8 from '../../../../public/img/PicturesSlider/Apple2.jpg';
import image9 from '../../../../public/img/PicturesSlider/Apple9.jpg';

const images = [image4, image6, image5, image2, image7, image8, image9 ];

export const PicturesSlider: React.FC = () => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  const handleDotClick = (index: number) => {
    setImageIndex(index)
  }

  return (
    <section className={styles.section}>
      <div className={styles.sliderContainer}>
        <img src={images[imageIndex]} alt={`Slider-${imageIndex + 1}`}
          className={styles.sliderContainer__image}/>
      </div>

      <div className={styles.slider__icons}>
        <button onClick={prevImage} className={`${styles.icon} ${styles.slider__iconLeft}`}>
          <img src={strokeLeft} alt="Previous"/>
        </button>
        <button onClick={nextImage} className={`${styles.icon} ${styles.slider__iconRight}`}>
          <img src={strokeRight} alt="Next"/>
        </button>
      </div>
      <div className={styles.sliderIndicators}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.sliderIndicator} ${index === imageIndex ? styles.active : ''}`}
            onClick={() => handleDotClick(index)}>
          </span>
        ))}
      </div>
    </section>
  )
}
