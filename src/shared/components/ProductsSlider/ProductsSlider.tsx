import { IconButton } from '@/shared/components/IconButton';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '@/shared/components/ProductCard';
import { useRef, useState } from 'react';
import { Product } from '@/types/Product';
// eslint-disable-next-line max-len
import { ProductCardSkeleton } from '../ProductCard/components/ProductCardSkeleton';

interface Props {
  title: string;
  products?: Product[];
  isLoading?: boolean;
}

const CARD_SKELETONS_COUNT = 10;

export const ProductsSlider = ({
  title,
  products,
  isLoading = false,
}: Props) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const sliderContentRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    const sliderContent = sliderContentRef.current;

    sliderContent?.scrollBy({
      left: sliderContent.clientWidth,
      behavior: 'smooth',
    });
  };

  const scrollLeft = () => {
    const sliderContent = sliderContentRef.current;

    sliderContent?.scrollBy({
      left: -sliderContent.clientWidth,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const sliderContent = sliderContentRef.current;

    if (!sliderContent) {
      return;
    }

    setIsAtStart(sliderContent.scrollLeft === 0);

    setIsAtEnd(
      Math.ceil(sliderContent.scrollLeft + sliderContent.clientWidth) >=
        sliderContent.scrollWidth,
    );
  };

  let content: React.ReactNode = null;

  if (isLoading || !products) {
    content = Array.from({ length: CARD_SKELETONS_COUNT }, (_, index) => (
      <ProductCardSkeleton key={index} />
    ));
  } else {
    content = products.map(product => (
      <ProductCard
        key={product.id}
        id={product.id}
        category={product.category}
        itemId={product.itemId}
        imgURL={product.image}
        title={product.name}
        price={product.price}
        fullPrice={product.fullPrice}
        screen={product.screen}
        capacity={product.capacity}
        ram={product.ram}
      />
    ));
  }

  return (
    <section className={styles.productsSlider}>
      <div className={styles.topRow}>
        <h2 className={styles.sliderTitle}>{title}</h2>
        <div className={styles.controls}>
          <IconButton
            variant="arrow"
            rotate={270}
            onClick={scrollLeft}
            disabled={isAtStart}
          />
          <IconButton
            variant="arrow"
            rotate={90}
            onClick={scrollRight}
            disabled={isAtEnd}
          />
        </div>
      </div>

      <div
        className={styles.content}
        ref={sliderContentRef}
        onScroll={handleScroll}
      >
        {content}
      </div>
    </section>
  );
};
