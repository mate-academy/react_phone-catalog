import { useState } from 'react';
import styles from './Carousel.module.scss';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';
export const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex(index => (index + 1) % images.length);
  };

  const goPrev = () => {
    setActiveIndex(index => (index - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: goPrev,
    onSwipedRight: goNext,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  return (
    <>
      <div className={styles.container}>
        <div
          style={{ backgroundImage: `url(./${images[activeIndex]})` }}
          className={styles.image}
          {...handlers}
        ></div>
        <div className={styles.carousel}>
          <ul className={styles.carousel__list}>
            {images.map((image, index) => (
              <li
                key={index}
                className={classNames(styles.carousel__items, {
                  [styles['carousel__items--active']]: index === activeIndex,
                })}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  className={styles.carousel__image}
                  src={`./${image}`}
                  alt="1"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
