/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { ArrowButton } from '../Arrow/ArrowButton';
import { Card } from '../Card';
import styles from './ProductsSlider.module.scss';
import { useAppState, useAppDispatch } from '../../Context/AppContext';
import { getSuggestedProducts } from '../../modules/Base/utils/getSuggestedProducts';
import { Card as CardType } from '../../types/Card';

interface ProductsSliderProps {
  title: string;
  filter: 'price' | 'year' | 'random';
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  filter,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);
  const { products, isLoadingProducts } = useAppState();
  const { refCardWidth, refSliderWidth } = useAppDispatch();

  const gap = 16;

  function filterProducts(type: 'price' | 'year' | 'random'): CardType[] {
    switch (type) {
      case 'price':
        return products.filter(item => item.price >= 1000);
      case 'year':
        return products.filter(item => item.year >= 2021);
      case 'random':
        return getSuggestedProducts(products);
      default:
        return [];
    }
  }

  const [currentProducts, setCurrentProducts] = useState<CardType[]>(() =>
    filterProducts(filter),
  );
  const maxScrollPosition = Math.max(0, currentProducts.length - visibleCards);

  function findAbleScrollStep() {
    if (!refCardWidth.current) {
      return 0;
    }

    const cardWidth = refCardWidth.current.offsetWidth;

    return (cardWidth + gap) * scrollPosition;
  }

  function handleArrowClick(direction: 'left' | 'right') {
    setScrollPosition(prev => {
      if (direction === 'left') {
        return Math.max(prev - visibleCards, 0);
      } else {
        return Math.min(prev + visibleCards, maxScrollPosition);
      }
    });
  }

  useEffect(() => {
    if (refCardWidth.current && refSliderWidth.current) {
      const cardWidth = refCardWidth.current.offsetWidth;
      const sliderWidth = refSliderWidth.current.offsetWidth;
      const calculatedVisibleCards = Math.floor(
        (sliderWidth + gap) / (cardWidth + gap),
      );

      setVisibleCards(calculatedVisibleCards);
    }
  }, [
    refCardWidth.current?.offsetWidth,
    refSliderWidth.current?.offsetWidth,
    gap,
  ]);

  useEffect(() => {
    setCurrentProducts(filterProducts(filter));
  }, [filter, products]);

  return (
    <section ref={refSliderWidth} className={styles.section}>
      <div className={styles.head}>
        <h3 className={`pageTitle`}>{title}</h3>

        <div className={styles.arrows}>
          <ArrowButton
            direction="left"
            isDisabled={scrollPosition === 0}
            onClick={() => handleArrowClick('left')}
          />
          <ArrowButton
            direction="right"
            isDisabled={
              scrollPosition >= maxScrollPosition ||
              currentProducts.length <= visibleCards
            }
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>

      <div className={styles.wrapper}>
        <div
          className={styles.content}
          style={{
            transform: `translateX(-${findAbleScrollStep()}px)`,
          }}
        >
          {isLoadingProducts
            ? Array(4)
                .fill(undefined)
                .map((product, i) => <Card key={i} card={product} />)
            : currentProducts.map(product => (
                <Card key={product.id} card={product} />
              ))}
        </div>
      </div>
    </section>
  );
};
