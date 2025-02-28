import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Carousel.module.scss';
import { Article } from '../types/Article';
import { Product } from '../Product';
import { useWindowWidth } from '../../hooks/WindowWidth';

type Props = {
  items: Article[];
  title: string;
  isHot?: boolean;
  isInfo?: boolean;
};

export const Carousel: React.FC<Props> = ({
  items,
  title,
  isHot = false,
  isInfo = false,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState<number>(0); // Додаємо стан для ширини елемента
  const windowWidth = useWindowWidth();

  const carouselRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const lastMotion = useRef<'left' | 'right' | null>(null);

  // Визначаємо ширину одного елемента після завантаження компонента
  useEffect(() => {
    if (carouselRef.current) {
      const firstItem = carouselRef.current.children[0] as HTMLElement;

      if (firstItem) {
        setItemWidth(firstItem.offsetWidth); // Отримуємо ширину першого елемента
      }
    }
  }, [windowWidth, items]);

  const visibleItems = windowWidth > 500 ? 4 : 1;
  const maxIndex = items.length - visibleItems;

  // Обробник свайпу
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) {
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const diffX = startX.current - endX;

    const swipeThreshold = 50; // Мінімальна відстань для свайпу

    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0 && index < maxIndex) {
        lastMotion.current = 'left';
        setIndex(prev => prev + 1);
      } else if (diffX < 0 && index > 0) {
        lastMotion.current = 'right';
        setIndex(prev => prev - 1);
      }
    }

    startX.current = null;
  };

  useEffect(() => {
    setIndex(0);
  }, [items]);

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => {
              lastMotion.current = 'right';
              setIndex(prev => Math.max(prev - 1, 0));
            }}
            disabled={index === 0}
          >
            {'<'}
          </button>
          <button
            className={styles.button}
            onClick={() => {
              lastMotion.current = 'left';
              setIndex(prev => Math.min(prev + 1, maxIndex));
            }}
            disabled={index >= maxIndex}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <motion.div
          ref={carouselRef}
          className={styles.items}
          animate={{ x: -index * itemWidth }}
          transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
        >
          {items.map(item => (
            <Product
              isCatalog={true}
              key={item.id}
              article={item}
              fullPrice={isHot}
              scroll={isInfo}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
