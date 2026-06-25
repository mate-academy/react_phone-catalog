/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductData } from '../../types/ProductData';

type Props = {
  items: ProductData[];
  title: string;
};

export const Slider: React.FC<Props> = ({ items, title }) => {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [i, setI] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const wrap = (n: number, m: number) => ((n % m) + m) % m;

  useEffect(() => {
    const el = ref.current;

    if (!el || items.length === 0) {
      return;
    }

    const idx = wrap(i, items.length);
    const card = el.children[idx] as HTMLElement;

    if (!card) {
      return;
    }

    const left =
      card.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;

    el.scrollTo({ left, behavior: 'smooth' });
  }, [i, items.length]);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const update = () => {
      const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);

      setCanPrev(el.scrollLeft > 1);
      setCanNext(el.scrollLeft < maxLeft - 1);
    };

    update();
    const raf = requestAnimationFrame(update);

    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className={styles.slider__container}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__buttons}>
          <button
            className={styles.slider__button_left}
            disabled={!canPrev}
            onClick={() => setI(i - 1)}
          ></button>
          <button
            className={styles.slider__button_right}
            disabled={!canNext}
            onClick={() => setI(i + 1)}
          ></button>
        </div>
      </div>

      <div className={styles.slider__slider}>
        <div className={styles.slider__card} ref={ref}>
          <ProductCard productsArray={items} />
        </div>
      </div>
    </div>
  );
};
