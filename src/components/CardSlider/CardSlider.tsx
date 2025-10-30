import styles from './CardSlider.module.scss';
import CardItem from 'components/CardItem/CardItem';
import { Product } from 'types/ProductInfo';
import Left from 'assets/icons/arrow-left.svg';
import Right from 'assets/icons/arrow-right.svg';
import { useCallback, useRef, useState, useEffect } from 'react';

type Props = {
  products: Product[];
  title: string;
  option: 'new' | 'hot';
};

export const CardSlider: React.FC<Props> = ({ products, title, option }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = useCallback(() => {
    const container = sliderRef.current;
    if (container) {
      const newIsAtStart = container.scrollLeft <= 10;
      const newIsAtEnd =
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth - 10;

      setIsAtStart(newIsAtStart);
      setIsAtEnd(newIsAtEnd);
    }
  }, []);

  useEffect(() => {
    checkScrollPosition();
  }, [products, checkScrollPosition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);

    return () => clearTimeout(timer);
  }, [checkScrollPosition]);

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    checkScrollPosition();

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScrollPosition, 100);
    };

    container.addEventListener('scroll', handleScroll);

    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollPosition);
      clearTimeout(scrollTimeout);
    };
  }, [checkScrollPosition]);

  const scroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(checkScrollPosition, 600);
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            onClick={() => scroll('left')}
            className={styles.button}
            aria-label="Scroll left"
            disabled={isAtStart}
          >
            <img src={Left} alt="left arrow" className={styles.arrowIcon} />
          </button>
          <button
            onClick={() => scroll('right')}
            className={styles.button}
            aria-label="Scroll right"
            disabled={isAtEnd}
          >
            <img src={Right} alt="right arrow" className={styles.arrowIcon} />
          </button>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <div className={styles.slider} ref={sliderRef}>
          {products.map(product => (
            <div className={styles.cardWrapper} key={product.id}>
              <CardItem product={product} option={option} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
