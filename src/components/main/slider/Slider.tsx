import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import styles from './Slider.module.scss';
import { ProductCard } from '../productCard';

type Props = {
  title: string;
  discount?: boolean;
};

export const Slider: React.FC<Props> = ({ title, discount }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState(1);
  const totalNumber = products.length;

  useEffect(() => {
    fetch('./api/products.json')
      .then(response => response.json())
      .then(setProducts)
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  return (
    <>
      <div className={styles['brand_new_models']}>
        <div className={styles['brand_new_models__container']}>
          <h1 className={styles['brand_new_models__title']}>{title}</h1>
          <div className={styles['brand_new_models__button']}>
            <div className={styles['brand_new_models__button__left']}></div>
            <div className={styles['brand_new_models__button__right']}></div>
          </div>
        </div>

        <div
          style={{
            transform: `translateX(-${active * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
          className={styles['brand_new_models__slider']}
        >
          {[...products]
            .sort((a, b) => b.fullPrice - a.fullPrice)
            .map((product: Product) => {
              if (discount) {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    discount={true}
                  />
                );
              }

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  discount={false}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
