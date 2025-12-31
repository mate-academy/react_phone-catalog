import { useEffect, useRef, useState } from 'react';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { ProductCard } from '../ProductCard';
import { Title } from '../Title';
import { Product } from '../../modules/shared/types/Product';
import styles from './ModelsSlider.module.scss';
import { useLocation } from 'react-router-dom';

type Props = {
  title: string;
  products: Product[];
  isFullPrise?: boolean;
};

export const ModelsSlider: React.FC<Props> = ({
  title,
  products,
  isFullPrise,
}) => {
  const [disabledLeft, setDisabledLeft] = useState(true);
  const [disabledRight, setDisabledRight] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const cardsCount = products.length;
  let isScrolling = false;
  const pathname = useLocation();

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    const card = firstCardRef.current;

    if (!container || !card) {
      return;
    }

    const cardWidth = card.offsetWidth + 16;
    const index = Math.round(container.scrollLeft / cardWidth);

    const newIndex =
      direction === 'left'
        ? Math.max(0, index - 1)
        : Math.min(cardsCount - 1, index + 1);

    isScrolling = true;
    container.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });

    setTimeout(() => {
      setDisabledLeft(newIndex === 0);

      const maxScroll = container.scrollWidth - container.clientWidth;

      setDisabledRight(container.scrollLeft >= maxScroll - 5);

      isScrolling = false;
    }, 100);
  };

  useEffect(() => {
    containerRef.current?.scrollTo({ left: 0 });
  }, [pathname]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const handleScroll = () => {
      if (isScrolling) {
        return;
      }

      const cardWidth = firstCardRef.current?.offsetWidth ?? 0;
      const index = Math.round(container.scrollLeft / (cardWidth + 16));

      setDisabledLeft(index === 0);

      const maxScroll = container.scrollWidth - container.clientWidth;

      setDisabledRight(container.scrollLeft >= maxScroll - 5);
    };

    handleScroll();

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [cardsCount]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.models}>
      <div className={styles.models__top}>
        <Title text={title} level={2} />

        {(width < 1200 || products.length > 4) && (
          <div className={styles.models__controls}>
            <ButtonWithIcon
              rotate={180}
              disabled={disabledLeft}
              onClick={() => scroll('left')}
            />

            <ButtonWithIcon
              disabled={disabledRight}
              onClick={() => scroll('right')}
            />
          </div>
        )}
      </div>

      <div ref={containerRef} className={styles.models__slider}>
        {products.map((product, index) => (
          <div key={product.id} ref={index === 0 ? firstCardRef : null}>
            <ProductCard product={product} isFullPrise={isFullPrise} />
          </div>
        ))}
      </div>
    </section>
  );
};
