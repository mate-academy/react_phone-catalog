import { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Product } from '../../../types/types';
import { ButtonArrow } from '../../ui/ButtonArrow';
import { SectionTitle } from '../../ui/SectionTitle';
import { ProductCard } from '../ProductCard';
import { CardSkeleton } from '../ProductCard/skeleton';
import styles from './ProductColection.module.scss';

type Props = {
  title: string;
  products: Product[] | null;
  loading?: boolean;
};

export const ProductColection = ({ title, products, loading }: Props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardSize, setCardSize] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && cardRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const cardWidth = cardRef.current.clientWidth;
        const style = getComputedStyle(containerRef.current);
        const gap = parseInt(style.columnGap || style.gap || '0', 10);

        const totalCardWidth = cardWidth + gap;
        const visibleCards = Math.floor(containerWidth / cardWidth);

        setCardsPerView(visibleCards);
        setCardSize(totalCardWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  const maxIndex = useMemo(() => {
    if (!products) {
      return 0;
    }

    return Math.max(products.length - cardsPerView, 0);
  }, [products, cardsPerView]);

  const renderProducts = () => {
    if (loading) {
      return Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />);
    }

    return products?.map((product, index) => (
      <div
        key={product.id}
        ref={index === 0 ? cardRef : null}
        className={styles.card}
      >
        <ProductCard product={product} />
      </div>
    ));
  };

  return (
    <section className={styles.section}>
      <div className={styles.section__header}>
        <SectionTitle>{title}</SectionTitle>
        <div className={styles.section__arrows}>
          <ButtonArrow
            onClick={() => setCurrentIndex(prev => prev - 1)}
            disabled={currentIndex === 0}
            direction="left"
          />
          <ButtonArrow
            onClick={() => setCurrentIndex(prev => prev + 1)}
            disabled={currentIndex === maxIndex}
            direction="right"
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.hidden}>
          <div
            ref={containerRef}
            style={{ transform: `translateX(-${cardSize * currentIndex}px)` }}
            className={styles.slider}
          >
            {renderProducts()}
          </div>
        </div>
      </div>
    </section>
  );
};
