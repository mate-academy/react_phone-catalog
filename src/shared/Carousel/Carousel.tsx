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
  const [itemWidth, setItemWidth] = useState<number>(0);
  const windowWidth = useWindowWidth();

  const carouselRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const lastMotion = useRef<'left' | 'right' | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const firstItem = carouselRef.current.children[0] as HTMLElement;

      if (firstItem) {
        setItemWidth(firstItem.offsetWidth);
      }
    }
  }, [windowWidth, items]);

  const visibleItems = windowWidth > 500 ? 4 : 1;

  const maxIndex = Math.max(
    0,
    Math.ceil(
      items.length - (carouselRef.current?.offsetWidth ?? 0) / itemWidth,
    ),
  );

  useEffect(() => {
    setIndex(0);
  }, [items]);

  return (
    <div className={styles.carousel}>
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
