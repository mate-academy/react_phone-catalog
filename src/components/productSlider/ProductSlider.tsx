import classNames from 'classnames';
import styles from './ProductSlider.module.scss';
import { ProductCard } from '../productCard';
import { useEffect, useRef, useState } from 'react';

const products = [1, 2, 3, 4, 5, 6, 7, 8];

type Props = {
  type: string;
};

export const ProductSlider: React.FC<Props> = ({ type }) => {
  const [productWidth, setProductWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productsRef.current) {
      const firstProduct = productsRef.current.firstElementChild;

      if (firstProduct) {
        setProductWidth(firstProduct.clientWidth);
      }
    }
  }, [products]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (productsRef.current) {
        const maxScroll =
          productsRef.current.scrollWidth - productsRef.current.clientWidth;
        const nextScroll = productsRef.current.scrollLeft + productWidth;

        if (nextScroll >= maxScroll) {
          productsRef.current.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        } else {
          productsRef.current.scrollBy({
            left: productWidth,
            behavior: 'smooth',
          });
        }
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [productWidth]);

  useEffect(() => {
    const handleScroll = () => {
      if (productsRef.current) {
        setScrollPosition(productsRef.current.scrollLeft);
      }
    };

    if (productsRef.current) {
      productsRef.current.addEventListener('scroll', handleScroll);
    }

    const currentProductsRef = productsRef.current;

    return () => {
      if (currentProductsRef) {
        currentProductsRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handlePrevClick = () => {
    if (productsRef.current) {
      productsRef.current.scrollBy({
        left: -productWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleNextClick = () => {
    if (productsRef.current) {
      const maxScroll =
        productsRef.current.scrollWidth - productsRef.current.clientWidth;
      const nextScroll = productsRef.current.scrollLeft + productWidth;

      if (nextScroll >= maxScroll) {
        productsRef.current.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        productsRef.current.scrollBy({
          left: productWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      <section className={styles.goods}>
        <div className={styles.goods__header}>
          <h2 className={styles.goods__title}>{type}</h2>

          <div className={styles.goods__buttons}>
            <button
              onClick={handlePrevClick}
              className={styles.goods__slider}
              disabled={scrollPosition === 0}
            >
              <img
                className={classNames(
                  styles.goods__button,
                  styles.goods__button_left,
                )}
                src="../../img/icons/slider-button.svg"
                alt=""
              />
            </button>

            <button onClick={handleNextClick} className={styles.goods__slider}>
              <img
                className={classNames(
                  styles.goods__button,
                  styles.goods__button_right,
                )}
                src="../../img/icons/slider-button.svg"
                alt=""
              />
            </button>
          </div>
        </div>

        <div className={styles.goods__cards_wrapper}>
          <div className={styles.goods__cards} ref={productsRef}>
            {products.map(product => (
              <ProductCard key={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
