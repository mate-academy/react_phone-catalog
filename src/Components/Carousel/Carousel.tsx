import styles from './Carousel.module.scss';
import { arrowLeft, arrowRight } from '../../icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { nextImage, prevImage, setActiveImage } from '../features/carousel';
import { useCallback, useEffect } from 'react';

export const Carousel = () => {
  const dispatch = useAppDispatch();
  const { items, offset } = useAppSelector(state => state.carousel);

  const handlePrev = () => {
    dispatch(prevImage());
  };

  const handleNext = useCallback(() => {
    dispatch(nextImage());
  }, [dispatch]);

  const handleSliderClick = (index: number) => {
    dispatch(setActiveImage(index));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(timer);
  }, [handleNext, offset]);

  return (
    <div className={styles.block}>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={handlePrev}>
          <img src={arrowLeft} alt="arrow-left-icon" />
        </button>
        <div className={styles.carousel}>
          <ul className={styles.list}>
            {items.map(item => {
              return (
                <li
                  key={item.product}
                  className={styles.slide}
                  style={{ transform: `translateX(-${offset * 100}%)` }}
                >
                  <div className={styles.carouselWrapper}>
                    <div className={styles.carouselTextContainer}>
                      <p className={styles.title}>{item.title}</p>
                      <p className={styles.cotitle}>{item.cotitle}</p>
                      <button className={styles.orderButton}>Order now</button>
                    </div>
                    <div className={styles.productWrapper}>
                      <h3 className={styles.product}>{item.product}</h3>
                      <h4 className={styles.undername}>{item.undername}</h4>
                      <img
                        src={item.url}
                        alt={item.product}
                        className={styles.image}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <button className={styles.button} onClick={handleNext}>
          <img src={arrowRight} alt="arrow-right-icon" />
        </button>
      </div>

      <div className={styles.sliderWrapper}>
        {items.map((_, index) => (
          <div
            key={index}
            className={`${styles.sliderContainer} ${offset === index ? styles.active : ''}`}
            onClick={() => handleSliderClick(index)}
          >
            <button
              className={`${styles.sliderButtons} ${offset === index ? styles.active : ''}`}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};
