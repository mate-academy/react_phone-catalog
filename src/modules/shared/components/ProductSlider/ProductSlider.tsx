import styles from './ProductSlider.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../../../types/Product';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon/Icon';
import { useState, useRef, useEffect } from 'react';

type Props = {
  products: Product[];
  title?: string;
};

export const ProductSlider = ({ products, title = 'Hot prices' }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Підрахунок кількості видимих карток
  useEffect(() => {
    const calculateItemsPerView = () => {
      if (!sliderRef.current) return;

      const sliderWidth = sliderRef.current.offsetWidth;
      const firstCard = sliderRef.current.querySelector('[data-product-card]') as HTMLElement;

      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 16; // gap between cards
      const itemsCount = Math.floor((sliderWidth + gap) / (cardWidth + gap));

      setItemsPerView(itemsCount || 1);
    };

    calculateItemsPerView();
    window.addEventListener('resize', calculateItemsPerView);

    return () => window.removeEventListener('resize', calculateItemsPerView);
  }, [products]);

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;

    const firstCard = sliderRef.current.querySelector('[data-product-card]') as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 16;
    const scrollPosition = index * (cardWidth + gap);

    sliderRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    const maxIndex = products.length - itemsPerView;
    const nextIndex = Math.min(currentIndex + itemsPerView, maxIndex);
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - itemsPerView, 0);
    setCurrentIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= products.length - itemsPerView;

  return (
    <section className={styles.productSlider}>
      <div className={styles.productSliderHeader}>
        <h2 className={styles.productSliderTitle}>{title}</h2>
        <div className={styles.productSliderControls}>
          <IconButton
            icon={<Icon name="arrow-left" />}
            aria-label="Previous"
            onClick={handlePrev}
            disabled={isAtStart}
          />
          <IconButton
            icon={<Icon name="arrow-right" />}
            aria-label="Next"
            onClick={handleNext}
            disabled={isAtEnd}
          />
        </div>
      </div>

      <div className={styles.productSliderWrapper}>
        <div className={styles.productSliderList} ref={sliderRef}>
          {products.map((product) => (
            <div key={product.id} data-product-card>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
