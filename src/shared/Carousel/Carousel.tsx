import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Carousel.module.scss';
import { Article } from '../types/Article';
import { Product } from '../Product';

type Props = {
  items: Article[];
  title: string;
  isHot?: boolean;
};

export const Carousel: React.FC<Props> = ({ items, title, isHot = false }) => {
  const [index, setIndex] = useState<number>(0);
  const visibleItems: number = 4;
  const maxIndex = 4;

  const handleNext = () => {
    setIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setIndex(prev => prev - 1);
  };

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
            onClick={handlePrev}
            disabled={index === 0}
          >
            {'<'}
          </button>
          <button
            className={styles.button}
            onClick={handleNext}
            disabled={index >= maxIndex}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <motion.div
          className={styles.items}
          animate={{ x: `-${index * (50 / visibleItems)}%` }} // Зсуваємо по X
          transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }} // Плавна анімація
        >
          {items.map(item => (
            <Product key={item.id} article={item} fullPrice={isHot} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
