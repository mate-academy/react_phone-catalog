import styles from './Carousel.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import stylesBtn from '../../styles/button.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types';
import { Card } from '../Card/Card';
import { useAppSelector } from '../../app/hooks';

type Props = {
  items: Product[];
  visibleDiscount: boolean;
};

export const Carousel: React.FC<Props> = ({ items, visibleDiscount }) => {
  const { darkTheme } = useAppSelector(state => state.darkTheme);
  const itemRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentShift, setCurrentShift] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const visibleItems = containerWidth / (itemWidth + 16);

  const maxShift =
    Math.max(0, (items.length - visibleItems) * (itemWidth + 16)) - 16;

  const updateWidth = () => {
    if (itemRef.current) {
      const { width } = itemRef.current.getBoundingClientRect();

      setItemWidth(width);
    }

    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();

      setContainerWidth(width);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateWidth();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleNext = () => {
    if (currentShift + itemWidth + 16 > maxShift) {
      setCurrentShift(maxShift);

      return;
    }

    setCurrentShift(currentShift + itemWidth + 16);
  };

  const handlePrev = () => {
    if (!itemWidth) {
      return;
    }

    if (currentShift - itemWidth - 16 < 0) {
      setCurrentShift(0);
    } else {
      setCurrentShift(currentShift - itemWidth - 16);
    }
  };

  return (
    <div className={styles.carousel__container} ref={containerRef}>
      <div className={styles.carousel__navButtons}>
        <button
          className={`${styles.carousel__navButton__left} ${stylesIcon.icon} ${darkTheme ? stylesIcon.icon__arrowLeft__dark : stylesIcon.icon__arrowLeft} ${stylesBtn.button}`}
          onClick={handlePrev}
          disabled={currentShift === 0}
        ></button>
        <button
          className={`${styles.carousel__navButton__right} ${stylesIcon.icon} ${darkTheme ? stylesIcon.icon__arrowRight__dark : stylesIcon.icon__arrowRight} ${stylesBtn.button}`}
          onClick={handleNext}
          disabled={currentShift === maxShift}
        ></button>
      </div>
      <div className={styles.carousel__cards}>
        <ul
          className={styles.carousel__list}
          style={{
            transition: `transform 300ms ease-in-out`,
            transform: `translateX(-${currentShift}px)`,
          }}
        >
          {items.map((phone: Product) => (
            <li key={phone.id} className={styles.carousel__item}>
              <div ref={itemRef}>
                <Card item={phone} discount={visibleDiscount} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
