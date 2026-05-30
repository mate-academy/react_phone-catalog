import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { ProductCard } from '../ProductCard';
import { Title } from '../Title';
import { Product } from '../../modules/shared/types/Product';
import styles from './ModelsSlider.module.scss';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const updateButtons = (scrollLeft: number) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    setDisabledLeft(scrollLeft <= 0);
    setDisabledRight(
      scrollLeft + container.clientWidth >= container.scrollWidth - 5,
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    const card = container?.firstElementChild as HTMLElement;

    if (!container || !card) {
      return;
    }

    const cardWidth = card.offsetWidth + 16;
    const currentIndex = Math.round(container.scrollLeft / cardWidth);

    const newIndex =
      direction === 'left' ? Math.max(0, currentIndex - 1) : currentIndex + 1;

    const newScrollLeft = newIndex * cardWidth;

    container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    updateButtons(newScrollLeft);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 0 });
      setDisabledLeft(true);
      setDisabledRight(
        containerRef.current.scrollWidth <= containerRef.current.clientWidth,
      );
    }
  }, [pathname, products.length]);

  return (
    <section className={styles.models}>
      <div className={styles.models__top}>
        <Title text={title} level={2} />

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
      </div>

      <div ref={containerRef} className={styles.models__slider}>
        {products.map(product => (
          <div key={product.id} className={styles.models__cardWrapper}>
            <ProductCard product={product} isFullPrise={isFullPrise} />
          </div>
        ))}
      </div>
    </section>
  );
};
