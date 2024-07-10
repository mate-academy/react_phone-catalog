import { useCallback, useEffect, useState } from 'react';
import styles from './PictureSlider.module.scss';
import { useWindowWidth } from '@react-hook/window-size';
import { SliderButtonPictureSlider } from '../SliderButton_PictureSlider';

export const PictureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = useWindowWidth();

  const isMobile = screenWidth >= 320 && screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1200;
  const isDesctop = screenWidth >= 1200;

  const SliderPicturesDesktop = [
    {
      id: 1,
      src: '/img/homePage/Banner-bigDesctop.png',
      title: 'phones',
    },
    {
      id: 2,
      src: '/img/homePage/slide-2.webp',
      title: 'tablets',
    },
    {
      id: 3,
      src: '/img/homePage/slide-3.jpg',
      title: 'accessories',
    },
  ];

  const SliderPicturesTablet = [
    {
      id: 1,
      src: '/img/homePage/Banner-middleTablet.png',
      title: 'phones',
    },
    {
      id: 2,
      src: '/img/homePage/slide-2.webp',
      title: 'tablets',
    },
    {
      id: 3,
      src: '/img/homePage/slide-3.jpg',
      title: 'accessories',
    },
  ];

  const SliderPicturesMobile = [
    {
      id: 1,
      src: '/img/homePage/Banner-smallDesctop.png',
      title: 'phones',
    },
    {
      id: 2,
      src: '/img/homePage/slide-2.webp',
      title: 'tablets',
    },
    {
      id: 3,
      src: '/img/homePage/slide-3.jpg',
      title: 'accessories',
    },
  ];

  const SliderPictures = isMobile
    ? SliderPicturesMobile
    : isTablet
      ? SliderPicturesTablet
      : SliderPicturesDesktop;

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  const handleNextClick = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === SliderPictures.length - 1 ? 0 : prevIndex + 1,
    );
  }, []);

  useEffect(() => {
    const handlerId = setInterval(handleNextClick, 5_000);

    return () => {
      clearInterval(handlerId);
    };
  }, []);

  let imgWidth = screenWidth;

  if (isTablet) {
    imgWidth = screenWidth - 2 * 32 - 2 * 19 - 2 * 24;
  }

  if (isDesctop) {
    imgWidth = screenWidth - 2 * 32 - 2 * 16 - 2 * 32;
  }

  return (
    <>
      <section className={styles.slider}>
        <button className={styles.button} onClick={handlePrevClick}>
          <img src="img/ArrowLeft.svg" alt="Previous" />
        </button>
        <div className={styles.container}>
          <div className={styles.sliderWrapper}>
            <div
              className={styles.sliderContent}
              style={{ left: `-${imgWidth * currentIndex}px` }}
            >
              {SliderPictures.map(picture => (
                <img
                  src={`${picture.src}`}
                  alt={picture.title}
                  key={picture.id}
                  className={styles.banner}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.bottomButton}>
          {[0, 1, 2].map(item => (
            <SliderButtonPictureSlider
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              item={item}
              key={item}
            />
          ))}
        </div>
        <button className={styles.button} onClick={handleNextClick}>
          <img src="img/ArrowRight.svg" alt="Next" />
        </button>
      </section>
      <div className={styles.bottomButtonSecond}>
        {[0, 1, 2].map(item => (
          <SliderButtonPictureSlider
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            item={item}
            key={item}
          />
        ))}
      </div>
    </>
  );
};
