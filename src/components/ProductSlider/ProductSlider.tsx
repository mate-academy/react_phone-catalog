import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../types/Product';
import styles from './ProductSlider.module.scss';

const cx = classNames.bind(styles);

type Props = {
  title: string;
  products: Product[];
};

const Chevron = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d={direction === 'left' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ProductSlider = ({ title, products }: Props) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const maxScroll = track.scrollWidth - track.clientWidth;

    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft < maxScroll - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    updateButtons();

    const observer = new ResizeObserver(updateButtons);

    observer.observe(track);

    return () => observer.disconnect();
  }, [updateButtons, products.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const [first, second] = Array.from(track?.children ?? []) as HTMLElement[];

    if (!track || !first) {
      return;
    }

    // крок = ширина картки + gap
    const step = second
      ? second.offsetLeft - first.offsetLeft
      : first.offsetWidth;

    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  return (
    <section className={cx('slider')}>
      <div className={cx('slider__header')}>
        <h2 className={cx('slider__title')}>{title}</h2>

        <div className={cx('slider__controls')}>
          <button
            type="button"
            className={cx('slider__button')}
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous products"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            className={cx('slider__button')}
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next products"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className={cx('slider__track')}
        onScroll={updateButtons}
      >
        {products.map(product => (
          <li key={product.id} className={cx('slider__item')}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
