import React, { useEffect, useState } from 'react';
import { Products } from '../../types/Products';
import styles from './ProductСarousel.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCarouselProps } from '../../types/ProductCarouselProps';

const ProductСarousel: React.FC<ProductCarouselProps> = ({ hotPrice }) => {
  const [productsList, setProductsList] = useState<Products>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const itemsPerPage = 4;
  const filtered = productsList.filter(p => p.year >= 2022);
  const filteredHotPrice = productsList.filter(p => p.year === 2020);

  const maxIndex = Math.ceil(filtered.length / itemsPerPage) - 1;

  const next = () => setIndex(prev => Math.min(prev + 1, maxIndex));
  const prev = () => setIndex(pre => Math.max(pre - 1, 0));

  const currentProducts = filtered.slice(
    index * itemsPerPage,
    (index + 1) * itemsPerPage,
  );

  const currentProductsHotPrice = filteredHotPrice.slice(
    index * itemsPerPage,
    (index + 1) * itemsPerPage,
  );

  const list = hotPrice ? currentProductsHotPrice : currentProducts;

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: Products) => {
        setProductsList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className={styles.homePage__products}>
      <div className={styles.homePage__products_header}>
        <h2 className={styles.homePage__products_title}>
          {hotPrice ? 'Hot price' : 'Brand new models'}
        </h2>

        <div className={styles.homePage__products_header_btns}>
          <button
            className={`${styles.homePage__products_header_button} ${
              index === 0
                ? styles.homePage__products_header_button_prev_disabled
                : ''
            }`}
            disabled={index === 0}
            onClick={prev}
          >
            {'<'}
          </button>
          <button
            className={`${styles.homePage__products_header_button} ${
              index === maxIndex
                ? styles.homePage__products_header_button_next_disabled
                : ''
            }`}
            disabled={index === maxIndex}
            onClick={next}
          >
            {'>'}
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.homePage__products_list}>
          {list.map(product => (
            <div key={product.id} className={styles.productSlide}>
              <ProductCard product={product} hotPrice={hotPrice} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductСarousel;
