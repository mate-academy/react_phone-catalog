import { useRef } from 'react';
import type { ProductListItem } from '../../api/types';
import { ProductCard } from '../ProductCard';
import s from './ProductsSlider.module.scss';
import arrowRight from '../../../assets/Chevron (Arrow Right).svg';
import arrowLeft from '../../../assets/Chevron Muted (Arrow Right).svg';

type Props = {
  title: string;
  items: ProductListItem[];
  priceMode?: 'discount' | 'full' | 'current';
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  items,
  priceMode = 'full',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const step = Math.min(el.clientWidth * 0.9, 900);

    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  if (!items.length) {
    return null;
  }

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <header className={s.header}>
          <h2 className={s.title}>{title}</h2>

          <div className={s.controls}>
            <button
              type="button"
              className={s.btn}
              onClick={() => scrollBy(-1)}
              aria-label="Prev"
            >
              <img src={arrowLeft} alt="" className={s.icon} />
            </button>
            <button
              type="button"
              className={s.btn}
              onClick={() => scrollBy(1)}
              aria-label="Next"
            >
              <img src={arrowRight} alt="" className={s.icon} />
            </button>
          </div>
        </header>

        <div className={s.scroller} ref={ref}>
          <div className={s.row}>
            {items.map(p => (
              <div className={s.cell} key={p.itemId}>
                <ProductCard key={p.itemId} product={p} priceMode={priceMode} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
