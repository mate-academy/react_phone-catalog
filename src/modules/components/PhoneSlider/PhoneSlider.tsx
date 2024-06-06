import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './PhoneSlider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../../types/Product';

type Props = {
  blockName: string;
  models: Product[];
  discount?: boolean;
};

export const PhoneSlider: React.FC<Props> = ({
  blockName,
  models,
  discount,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [productWidth, setProductWidth] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productsRef.current) {
      const firstProduct = productsRef.current.firstElementChild;

      if (firstProduct) {
        setProductWidth(firstProduct.clientWidth);
      }
    }
  }, [models]);

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

  const onClickPrevHandle = () => {
    if (productsRef.current) {
      productsRef.current.scrollBy({
        left: -productWidth,
        behavior: 'smooth',
      });
    }
  };

  const onClickNextHandle = () => {
    if (productsRef.current) {
      productsRef.current.scrollBy({
        left: productWidth,
        behavior: 'smooth',
      });
    }
  };

  const isButtonDisabled = () => {
    if (productsRef.current) {
      return (
        (productsRef.current && scrollPosition) ===
        productsRef.current.scrollWidth - productsRef.current.offsetWidth
      );
    }

    return false;
  };

  return (
    <section className={classNames(styles.container, styles.phoneSlider)}>
      <div className={styles.phoneSlider__top}>
        <h2
          className={classNames(
            styles.sectionTitle,
            styles.phoneSlider__header,
          )}
        >
          {blockName}
        </h2>
        <div className={styles.phoneSlider__buttons}>
          <button
            className={classNames(
              styles.phoneSlider__button,
              styles['phoneSlider__button-left'],
            )}
            onClick={onClickPrevHandle}
            disabled={scrollPosition === 0}
          />
          <button
            className={classNames(
              styles.phoneSlider__button,
              styles['phoneSlider__button-right'],
            )}
            onClick={onClickNextHandle}
            disabled={isButtonDisabled()}
          />
        </div>
      </div>

      <div className={styles.phoneSlider__products} ref={productsRef}>
        {models.map(product => (
          <article key={product.id} className={styles.phoneSlider__product}>
            <ProductCard product={product} discount={discount} />
          </article>
        ))}
      </div>
    </section>
  );
};
