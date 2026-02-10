import styles from './Carousel.module.scss';
import { ItemCard } from '../ItemCard';
import classNames from 'classnames';
import { useState } from 'react';
import { Product } from '../../types/Product';

interface Props {
  title: string;
  items: Product[];
  hasDiscount?: boolean;
}

export const Carousel: React.FC<Props> = ({ title, items, hasDiscount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemWidth = 272;
  const gap = 16;

  const visibleItems = 4;
  const maxIndex = items.length - visibleItems;

  const next = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(previous => previous + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(previous => previous - 1);
    }
  };

  const sliderStyle = {
    '--item-width': `${itemWidth}px`,
    '--gap': `${gap}px`,
    '--current-index': currentIndex,
  } as React.CSSProperties;

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__content}>
        <span className={styles.carousel__title}>{title}</span>
        <div className={styles.carousel__buttons}>
          <div
            className={classNames(styles.carousel__buttons__leftArrow, {
              [styles['carousel__buttons__leftArrow--disabled']]:
                currentIndex === 0,
            })}
            onClick={prev}
          />
          <div
            className={classNames(styles.carousel__buttons__rightArrow, {
              [styles['carousel__buttons__rightArrow--disabled']]:
                currentIndex === maxIndex,
            })}
            onClick={next}
          />
        </div>
      </div>
      <div className={styles.carousel__phones} style={sliderStyle}>
        {items.map(item => {
          return (
            <div key={item.id} className={styles.carousel__item}>
              <ItemCard item={item} hasDiscount={hasDiscount} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
