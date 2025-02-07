import style from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { useEffect, useRef, useState } from 'react';
import * as productServices from '../../api/products';
import { Product } from '../../types/products';
import { GAP } from '../../constants/layouts';
import { useSwipe } from '../../services/useSwipe';

export const ProductSlider = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);
  const gap = GAP;

  const [cardWidthWithGap, setcardWidthWithGap] = useState(0);
  const { startSwipe, endSwipe, scroll, scrollIndex } = useSwipe(phones.length);

  useEffect(() => {
    if (cardRef.current) {
      setcardWidthWithGap(cardRef.current.clientWidth + gap);
    }
  }, [gap, phones]);

  useEffect(() => {
    setLoading(true);

    productServices
      .getPhones()
      .then(products =>
        products
          .filter(product => product.year >= 2022)
          .sort(
            (phoneA: Product, phoneB: Product) =>
              phoneB.fullPrice - phoneA.fullPrice,
          ),
      )
      .then(setPhones)
      .catch(() =>
        setErrorMessage(`Loading data is failed, pls try again later`),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={style.productSlider}>
      <div className={style.productSlider__header}>
        <h2 className={style.productSlider__title}>Brand new models</h2>
        <div className={style.productSlider__buttons}>
          <button
            className={style.productSlider__button}
            onClick={() => scroll('left')}
          >
            <img
              className={style.productSlider__button__icon}
              src="src/assets/icons/arrow-left.svg"
              alt="arrow left"
            />
          </button>
          <button
            className={style.productSlider__button}
            onClick={() => scroll('right')}
          >
            <img
              className={style.productSlider__button__icon}
              src="src/assets/icons/arrow-right.svg"
              alt="arrow right"
            />
          </button>
        </div>
      </div>
      <div
        className={style.productSlider__cards}
        onTouchStart={startSwipe}
        onTouchEnd={endSwipe}
      >
        <div
          className={style.productSlider__track}
          style={{
            transform: `translateX(-${scrollIndex * cardWidthWithGap}px)`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {phones.map(iphone => (
            <div
              ref={cardRef}
              key={iphone.id}
              className={style.productSlider__card}
            >
              <ProductCard iphone={iphone} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
