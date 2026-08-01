import { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Product } from '@shared/types';
import { useTranslation } from '@shared/context';
import { ProductCard } from '@shared/components/ProductCard';
import { chevronRightIcon } from '@shared/assets/icons';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
  showDiscount?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount = false,
}) => {
  const { t } = useTranslation();
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const updateButtons = useCallback(() => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    setCanScrollBack(list.scrollLeft > 0);
    setCanScrollForward(
      list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    updateButtons();
    window.addEventListener('resize', updateButtons);

    return () => {
      window.removeEventListener('resize', updateButtons);
    };
  }, [updateButtons, products]);

  const scrollBy = (direction: 1 | -1) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    list.scrollBy({ left: direction * list.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className={styles.slider}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            aria-label={t('slider.prevProducts')}
            disabled={!canScrollBack}
            onClick={() => scrollBy(-1)}
          >
            <img
              src={chevronRightIcon}
              alt=""
              className={cn('icon', styles.iconPrev)}
            />
          </button>

          <button
            type="button"
            className={styles.button}
            aria-label={t('slider.nextProducts')}
            disabled={!canScrollForward}
            onClick={() => scrollBy(1)}
          >
            <img src={chevronRightIcon} alt="" className="icon" />
          </button>
        </div>
      </div>

      <ul className={styles.list} ref={listRef} onScroll={updateButtons}>
        {products.map(product => (
          <li key={product.id} className={cn(styles.item)}>
            <ProductCard product={product} showDiscount={showDiscount} />
          </li>
        ))}
      </ul>
    </section>
  );
};
