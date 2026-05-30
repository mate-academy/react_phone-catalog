import classNames from 'classnames';
import styles from './ProductSlider.module.scss';
import { ProductCard } from '../productCard';
import { useEffect, useRef, useState } from 'react';
import { ProductInfo } from '../../types/ProductInfo';

type Props = {
  type: string;
  products: ProductInfo[];
};

export const ProductSlider: React.FC<Props> = ({ type, products }) => {
  const [productWidth, setProductWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);
  const scrollingByScript = useRef(false);

  useEffect(() => {
    if (productsRef.current) {
      const firstProduct = productsRef.current.firstElementChild;

      if (firstProduct) {
        setProductWidth(firstProduct.clientWidth);
      }
    }
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollingByScript.current && productsRef.current) {
        setScrollPosition(productsRef.current.scrollLeft);
      }
    };

    if (productsRef.current) {
      productsRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (productsRef.current) {
        productsRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handlePrevClick = () => {
    if (productsRef.current) {
      const prevScroll = productsRef.current.scrollLeft - productWidth;

      scrollingByScript.current = true;

      productsRef.current.scrollBy({
        left: -productWidth,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setScrollPosition(Math.max(0, prevScroll));
        scrollingByScript.current = false;
      }, 500);
    }
  };

  const handleNextClick = () => {
    if (productsRef.current) {
      const maxScroll =
        productsRef.current.scrollWidth - productsRef.current.clientWidth;
      const nextScroll = productsRef.current.scrollLeft + productWidth;

      scrollingByScript.current = true;

      if (nextScroll >= maxScroll) {
        productsRef.current.scrollTo({
          left: 0,
          behavior: 'smooth',
        });

        setTimeout(() => {
          setScrollPosition(0);
          scrollingByScript.current = false;
        }, 500);
      } else {
        productsRef.current.scrollBy({
          left: productWidth,
          behavior: 'smooth',
        });

        setTimeout(() => {
          setScrollPosition(nextScroll);
          scrollingByScript.current = false;
        }, 500);
      }
    }
  };

  return (
    <section className={styles.goods}>
      <div className={styles.goods__header}>
        <h2 className={styles.goods__title}>{type}</h2>

        <div className={styles.goods__buttons}>
          <button
            onClick={handlePrevClick}
            className={classNames(styles.goods__slider, {
              [styles.goods__slider_disabled]: scrollPosition === 0,
            })}
          >
            <img
              className={classNames(
                styles.goods__button,
                styles.goods__button_left,
              )}
              src="img/icons/chevron.svg"
              alt=""
            />
          </button>

          <button
            onClick={handleNextClick}
            className={classNames(styles.goods__slider)}
          >
            <img
              className={styles.goods__button}
              src="img/icons/chevron.svg"
              alt=""
            />
          </button>
        </div>
      </div>

      <div className={styles.goods__cards_wrapper}>
        <div className={styles.goods__cards} ref={productsRef}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
};
