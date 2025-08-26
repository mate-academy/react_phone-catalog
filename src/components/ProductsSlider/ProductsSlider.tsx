import { useMemo, useState } from 'react';
import s from './ProductsSlider.module.scss';
import { Product } from '../../types';
import { ProductCard } from '../../shared/ProductCard';

type Props = {
  title: string;
  products: Product[];
  itemWidth?: number;
  step?: number;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  itemWidth = 272,
  step = 3,
}) => {
  const items = useMemo(() => products ?? [], [products]);
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, items.length - step);

  const prev = () => setIndex(i => Math.max(0, i - step));
  const next = () => setIndex(i => Math.min(maxIndex, i + step));

  return (
    <section className={s.root}>
      <div className={s.header}>
        <h3>{title}</h3>
        <div className={s.arrows}>
          <button className={s.btn} onClick={prev} disabled={index === 0}>
            ‹
          </button>
          <button className={s.btn} onClick={next} disabled={index >= maxIndex}>
            ›
          </button>
        </div>
      </div>

      <div className={s.frame}>
        <div
          className={s.track}
          style={{
            transform: `translateX(-${index * (itemWidth + 16)}px)`,
          }} /* 16 = gap */
        >
          {items.map(p => (
            <div key={p.id} className={s.item} style={{ width: itemWidth }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSlider;
