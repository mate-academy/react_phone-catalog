import styles from './Slider.module.scss';

import classNames from 'classnames';
import { imagesHero } from '../../../../../constants/imagesHero';
import { useEffect, useState } from 'react';

export const Slider = () => {
  const [activeImgIndex, setActiveImgIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const imgs = [
    imagesHero[imagesHero.length - 1],
    ...imagesHero,
    imagesHero[0],
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveImgIndex(prevIndex =>
        prevIndex !== imgs.length - 1 ? prevIndex + 1 : 1,
      );
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [activeImgIndex]);

  useEffect(() => {
    if (activeImgIndex === imgs.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveImgIndex(1);
      }, 1000);

      setTimeout(() => {
        setIsTransitioning(true);
        setActiveImgIndex(2);
      }, 3000);
    }
  }, [activeImgIndex]);

  const handleSlideCount = (index: number) => {
    setActiveImgIndex(index);

    if (imagesHero.length < activeImgIndex) {
      setIsTransitioning(false);
      setActiveImgIndex(1);

      setTimeout(() => {
        setIsTransitioning(true);
        setActiveImgIndex(index);
      }, 1000);

      return;
    }

    setIsTransitioning(true);
  };

  return (
    <div className={styles.sliderContainer}>
      <div
        className={classNames(styles.sliderImgContainer, {
          [styles.sliderImgContainerTransition]:
            imgs.length - 1 === activeImgIndex,
        })}
        style={{
          transition: isTransitioning ? 'all 1s ease-out' : 'none',
          transform: `translateX(${-100 * activeImgIndex}%)`,
        }}
      >
        {imgs.map(({ id, src }, i) => (
          <img key={id + i} src={src} alt={id} className={styles.sliderImg} />
        ))}
      </div>
      <div className={styles.positionBtnContainer}>
        {imagesHero.map((img, index) => (
          <button
            key={img.id}
            id={`btn${index}`}
            onClick={() => handleSlideCount(index + 1)}
            className={classNames(styles.positionBtn, {
              [styles.positionBtnActive]:
                index + 1 === activeImgIndex ||
                (activeImgIndex === imgs.length - 1 && !index),
            })}
          ></button>
        ))}
      </div>
    </div>
  );
};
