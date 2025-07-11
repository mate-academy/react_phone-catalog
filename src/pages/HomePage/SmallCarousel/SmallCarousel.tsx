import style from './SmallCarousel.module.scss';
import { ProductCard } from '../../../components/ProductCard';
import { ShortProduct } from '../../../shared/models';
import { useEffect, useRef, useState } from 'react';
import { Breakpoints } from '../../../shared/Enums';

type Props = {
  products: ShortProduct[];
  title: string;
  discount?: boolean;
};

enum cardWidth {
  desk = 272,
  tablet = 237,
  phone = 212,
}

const CARD_GAP = 16;

export const SmallCarousel = ({ products, title, discount = false }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(cardWidth.desk + CARD_GAP);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollAmount = () => {
    const width = window.innerWidth;

    if (width <= Breakpoints.phone) {
      setScrollAmount(cardWidth.phone + CARD_GAP);
    } else if (width <= Breakpoints.tablet) {
      setScrollAmount(cardWidth.tablet + CARD_GAP);
    } else {
      setScrollAmount(cardWidth.desk + CARD_GAP);
    }

    updateScrollButtons();
  };

  const updateScrollButtons = () => {
    const el = trackRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollAmount();

    const el = trackRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateScrollButtons);

    window.addEventListener('resize', updateScrollAmount);

    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollAmount);
    };
  }, []);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section>
      <div className={`container ${style.smCarousel__header}`}>
        <div>{title}</div>
        <div className={style.smCarousel__btnContainer}>
          <button onClick={scrollLeft} disabled={!canScrollLeft}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(180deg)' }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button onClick={scrollRight} disabled={!canScrollRight}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${style.smCarousel__carousel} ${style.customContainer}`}
        ref={trackRef}
      >
        <div className={style.smCarousel__track}>
          {products.map((el: ShortProduct) => (
            <div className={style.smCarousel__cardContainer}>
              <ProductCard key={el.id} product={el} discount={discount} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
