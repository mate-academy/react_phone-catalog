import React, { useContext, useState } from 'react';
import { Product } from '../../../types/Product';
import styles from './Slider.module.scss';
import { ProductCard } from '../productCard';
import { ContextApp } from '../../../appContext/AppContext';

type Props = {
  title: string;
  discount?: boolean;
  showRandom?: boolean;
};

export const Slider: React.FC<Props> = ({ title, discount }) => {
  const { products, productsTotalNumber } = useContext(ContextApp);
  const [active, setActive] = useState(0);

  const handlerleft = () => {
    if (active < 0) {
      setActive(productsTotalNumber);
    }
    setActive(
      prevState => (prevState - 1 + productsTotalNumber) % productsTotalNumber,
    );
  };
  const handlerRight = () => {
    if (active > productsTotalNumber) {
      setActive(0);
    }
    setActive(prevState => (prevState + 1) % productsTotalNumber);
  };

  return (
    <>
      <div className={styles['brand_new_models']}>
        <div className={styles['brand_new_models__container']}>
          <h2 className={styles['brand_new_models__title']}>{title}</h2>
          <div className={styles['brand_new_models__button']}>
            <div
              onClick={handlerleft}
              className={styles['brand_new_models__button__left']}
            ></div>
            <div
              onClick={handlerRight}
              className={styles['brand_new_models__button__right']}
            ></div>
          </div>
        </div>

        <div
          style={{
            transform: `translateX(-${active * 228}px)`,
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
