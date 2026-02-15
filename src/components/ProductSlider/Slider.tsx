import { useState, useRef } from 'react';
import { ProdactCard } from '../ProdactCard';
import { Loader } from '../Loader';
import arrowLeft from '../../assets/icons/arrow/left.svg';
import arrowRight from '../../assets/icons/arrow/right.svg';
import arrowLeftDisabled from '../../assets/icons/arrow/leftDisabled.svg';
import arrowRightDisabled from '../../assets/icons/arrow/rightDisabled.svg';
import { Product } from '../../shared/types/Product';
import styles from './Slider.module.scss';

type SliderProps = {
  products: Product[];
  title: string;
  discount?: boolean;
};

export const Slider: React.FC<SliderProps> = ({
  products,
  title,
  discount,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateButtonState = () => {
    const el = scrollRef.current;

    if (!el) {
      return;
    }

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft >= maxScroll - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    const list = scrollRef.current;
    const item = itemRef.current;

    if (!list || !item) {
      return;
    }

    const itemWidth = item.getBoundingClientRect().width;
    const gap = 16;

    const scrollAmount = itemWidth + gap;

    list.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(updateButtonState, 300);
  };

  return (
    <div className={styles.Slider}>
      <div className={styles.Slider__header}>
        <h2 className={styles.Slider__title}>{title}</h2>
        <div className={styles.Slider__buttons}>
          <button
            className={`${styles.Slider__button} ${isAtStart ? styles.disabled : ''}`}
            onClick={() => scroll('left')}
          >
            <img
              src={isAtStart ? arrowLeftDisabled : arrowLeft}
              alt="arrow left"
            />
          </button>
          <button
            className={`${styles.Slider__button} ${isAtEnd ? styles.disabled : ''}`}
            onClick={() => scroll('right')}
          >
            <img
              src={isAtEnd ? arrowRightDisabled : arrowRight}
              alt="arrow right"
            />
          </button>
        </div>
      </div>

      <div
        className={styles.Slider__list}
        ref={scrollRef}
        onScroll={updateButtonState}
      >
        {products ? (
          products.map((model, index) => (
            <div
              key={model.id}
              className={styles.Slider__item}
              ref={index === 0 ? itemRef : null}
            >
              <ProdactCard card={model} discount={discount} />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
