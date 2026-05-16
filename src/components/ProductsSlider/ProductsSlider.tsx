import { useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import style from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  widthIt?: number;
  step?: number;
  priceMode?: 'full' | 'discount';
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  widthIt = 272,
  step = 3,
  priceMode = 'full',
}) => {
  const items = useMemo(() => products ?? [], [products]);
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, items.length - step);

  const prev = () => setIndex(ind => Math.max(0, ind - step));
  const next = () => setIndex(ind => Math.min(maxIndex, ind + step));

  return (
    <section className={style.main}>
      <div className={style.sliderHeader}>
        <h3 className={style.title}>{title}</h3>
        <div className={style.button}>
          <button
            className={`${style.buttonAll} ${style.buttonLeft}`}
            onClick={prev}
            disabled={index === 0}
          >
            <img src="img/arrows/arrow_left.svg" alt="arrow left" />
          </button>
          <button
            className={`${style.buttonAll} ${style.buttonRight}`}
            onClick={next}
            disabled={index >= maxIndex}
          >
            <img src="img/arrows/arrow_right.svg" alt="arrow right" />
          </button>
        </div>
      </div>

      <div className={style.bottom}>
        <div
          className={`${style.bottomCard}`}
          style={{ transform: `translateX(-${index * (widthIt + 16)}px)` }}
        >
          {items.map(it => (
            <div key={it.id} className={style.item} style={{ width: widthIt }}>
              <ProductCard product={it} priceMode={priceMode} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
