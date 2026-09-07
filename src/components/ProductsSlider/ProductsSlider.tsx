import style from './ProductsSlider.module.scss';
import { Directions, IconId, IconStyles } from '../../types/icons';
import { Button } from '../../shared/ui/Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { ProductCard } from '../ProductCard';
import { ProdCard } from '../../types/Product';
import { SkeletonSlider } from '../../shared/ui/Skeletons/SkeletonSlider';

type Props = {
  title: string;
  products: ProdCard[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const { isDataReady, loading } = useContext(ProductContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = 300;
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const checkScrollButtons = () => {
    const el = containerRef.current;

    if (!el) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollPrev(scrollLeft > 0);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scrollNext = () => {
    if (containerRef.current !== null) {
      containerRef.current.scrollBy({
        left: scrollByAmount,
        behavior: 'smooth',
      });
    }

    setTimeout(checkScrollButtons, 300);
  };

  const scrollPrev = () => {
    if (containerRef.current !== null) {
      containerRef.current.scrollBy({
        left: -scrollByAmount,
        behavior: 'smooth',
      });
    }

    setTimeout(checkScrollButtons, 300);
  };

  useEffect(() => {
    if (!loading && isDataReady && products.length > 0) {
      setTimeout(checkScrollButtons, 0);
    }
  }, [isDataReady, loading, products]);

  useEffect(() => {
    const el = containerRef.current;

    if (!el) {
      return;
    }

    el.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);

    checkScrollButtons();

    return () => {
      el.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  return (
    <section className={style.hotPricesSlider}>
      <div className={style.titleWrapper}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.buttonWrapper}>
          <Button
            iconId={IconId.Chevron}
            directions={Directions.Left}
            onClick={scrollPrev}
            filled={!canScrollPrev ? IconStyles.Disabled : undefined}
            disabled={!canScrollPrev}
          />
          <Button
            iconId={IconId.Chevron}
            directions={Directions.Right}
            onClick={scrollNext}
            filled={!canScrollNext ? IconStyles.Disabled : undefined}
            disabled={!canScrollNext}
          />
        </div>
      </div>

      <div className={style.rootContainer}>
        {loading && <SkeletonSlider count={products.length || 4} />}

        <div className={style.sliderContainer} ref={containerRef}>
          {!loading &&
            isDataReady &&
            products &&
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};
