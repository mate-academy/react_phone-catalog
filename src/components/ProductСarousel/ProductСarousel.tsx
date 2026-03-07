/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { ProductCards } from '../../types/product.types';
import styles from './ProductСarousel.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCarouselProps } from '../../types/ProductCarouselProps';

import Chevron from '/img/ChevronRight.png';
import { Skeleton } from '@mui/material';

const ProductСarousel: React.FC<ProductCarouselProps> = ({
  hotPrice = false,
  title,
  products,
}) => {
  const [productsList, setProductsList] = useState<ProductCards>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  const itemsPerPage = 4;

  const sourceProducts = products || productsList;

  const selectedProductsList = () => {
    if (hotPrice) {
      return sourceProducts.filter(p => p.year === 2020);
    }

    if (title === 'You may also like') {
      return sourceProducts;
    }

    return sourceProducts.filter(p => p?.year && p.year >= 2022);
  };

  const listSource = selectedProductsList();

  const maxIndex = Math.ceil(listSource.length / itemsPerPage) - 1;

  const next = () => setIndex(nextPart => Math.min(nextPart + 1, maxIndex));
  const prev = () => setIndex(prevPart => Math.max(prevPart - 1, 0));

  useEffect(() => {
    if (products) {
      setLoading(false);

      return;
    }

    setLoading(true);

    fetch(`${import.meta.env.BASE_URL}api/products.json`)
      .then(res => res.json())
      .then((data: ProductCards) => {
        setProductsList(data);
        setLoading(false);
      })
      .catch(err => (setProductsList([]), setLoading(false), setError(err)))
      .finally(() => setLoading(false));
  }, [products]);

  useEffect(() => {
    setIndex(0);
  }, [listSource.length]);

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div className={styles.homePage__products}>
      <div className={styles.homePage__products_header}>
        <h2 className={styles.homePage__products_title}>
          {title || (hotPrice ? 'Hot price' : 'Brand new models')}
        </h2>

        <div className={styles.homePage__products_header_btns}>
          <button
            className={`${styles.homePage__products_header_button} ${
              index === 0
                ? styles.homePage__products_header_button_prev_disabled
                : ''
            }`}
            onClick={prev}
          >
            <img src={Chevron} alt="Arrow right" />
          </button>

          <button
            className={`${styles.homePage__products_header_button} ${
              index === maxIndex
                ? styles.homePage__products_header_button_next_disabled
                : ''
            }`}
            onClick={next}
            disabled={index === maxIndex || loading}
          >
            <img
              src={Chevron}
              alt="Arrow left"
              style={{ transform: 'rotate(180deg)' }}
            />
          </button>
        </div>
      </div>

      <div className={styles.homePage__products_list_wrapper}>
        <div
          className={styles.homePage__products_list}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: 'transform 0.4s ease',
          }}
        >
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, ind) => (
                <div key={ind} className={styles.productSlide__card}>
                  <Skeleton variant="rectangular" width="100%" height={250} />
                  <Skeleton
                    variant="text"
                    width="80%"
                    style={{ marginTop: 8 }}
                  />
                  <Skeleton variant="text" width="60%" />
                </div>
              ))
            : listSource.map((product, idx) => (
                <div
                  key={`${product.id}-${idx}`}
                  className={styles.productSlide}
                >
                  <ProductCard product={product} hotPrice={hotPrice} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductСarousel;
