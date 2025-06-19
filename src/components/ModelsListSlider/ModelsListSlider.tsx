import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { ProductCard } from '../ProductCard';
import styles from './ModelsListSlider.module.scss';
import { Card } from '../../types/card';

type Props = {
  title: string;
  products: Card[];
  discount: boolean;
};

export const ModelsListSlider: React.FC<Props> = ({
  title,
  products,
  discount,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateButtons = () => {
    const el = scrollRef.current;

    if (!el) {
      return;
    }

    setIsAtStart(el.scrollLeft === 0);
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  const handleMoveList = (direction: string) => {
    if (scrollRef.current) {
      const cardEl = document.querySelector('.js-card');
      const cardWidth = cardEl ? cardEl.getBoundingClientRect().width + 16 : 0;
      const maxScroll = scrollRef.current?.scrollWidth;
      const containerWidth = document.querySelector(
        `.${styles.product_list}`,
      )?.clientWidth;

      updateButtons();

      if (direction === 'prev') {
        if (scrollRef.current.scrollLeft - cardWidth <= 0) {
          scrollRef.current.scrollBy({
            left: -scrollRef.current?.scrollLeft,
            behavior: 'smooth',
          });
        } else {
          scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
      }

      if (direction === 'next') {
        if (containerWidth) {
          if (
            scrollRef.current.scrollLeft + cardWidth >
            maxScroll - containerWidth
          ) {
            const scrollRight =
              maxScroll - containerWidth - scrollRef.current.scrollLeft;

            scrollRef.current.scrollBy({
              left: scrollRight,
              behavior: 'smooth',
            });
          } else {
            scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) {
      return;
    }

    const onScroll = () => updateButtons();

    el.addEventListener('scroll', onScroll);

    setTimeout(() => {
      updateButtons();
    }, 100);

    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.title__text}>{title}</h2>
        <div className={styles.title__buttons}>
          <Button
            direction="prev"
            onClick={() => handleMoveList('prev')}
            disabled={isAtStart}
          />
          <Button
            direction="next"
            onClick={() => handleMoveList('next')}
            disabled={isAtEnd}
          />
        </div>
      </div>

      <div className={styles.wrap} ref={scrollRef}>
        <div className={styles.product_list}>
          {products.map((card: Card) => (
            <div key={card.id} className="js-card">
              <ProductCard card={card} discount={discount} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
