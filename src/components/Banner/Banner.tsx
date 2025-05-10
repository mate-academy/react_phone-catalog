import banner1 from '../../../public/img/banner-tablets.png';
import banner2 from '../../../public/img/banner-phones.png';
import banner3 from '../../../public/img/banner-accessories.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './Banner.module.scss';
import { useEffect, useState } from 'react';

const images = [banner1, banner2, banner3];
const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  useEffect(() => {
    const newInterval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(newInterval);
  }, []);

  return (
    <>
      <div className={styles.banner__slider}>
        <button
          className={`${styles.banner__arrow} ${styles.arrow} ${styles.first}`}
          onClick={prevSlide}
        >
          <ArrowBackIosNewIcon />
        </button>

        <div className={styles.banner__image}>
          <img src={images[currentIndex]} alt="Banner" />
        </div>

        <button
          className={`${styles.banner__arrow} ${styles.arrow} ${styles.last}`}
          onClick={nextSlide}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>

      <div className={styles.banner__dots}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.banner__dot} ${index === currentIndex ? styles.active : ''}`}
          />
        ))}
      </div>
    </>
  );
};

export default Banner;
