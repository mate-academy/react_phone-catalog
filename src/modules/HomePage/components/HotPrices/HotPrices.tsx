import { useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import styles from '../HotPrices/HotPrices.module.scss';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import { ProductCard } from '../ProductCard';

export const HotPrices = () => {
  const { products: hotPrice } = useAppSelector(state => state.product);
  const [sliderWidht, setSliderWidht] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const { products: product } = useAppSelector(state => state.product)

  const sliderRight = () => {
    if (sliderWidht === 0) {
      setSliderWidht(272 + 16);
      setCountProduct(2)
    } else {
      if (countProduct <= hotPrice.length) {
        setSliderWidht((carentValue) => carentValue + 272 + 16);
        setCountProduct(carentValue => carentValue + 4);
      }
    }
  }

  const sliderLeft = () => {
    if (sliderWidht >= 100) {
      setSliderWidht((carentValue) => carentValue - (272 + 16));

      setCountProduct(carentValue => carentValue - 1);
    }

    if (countProduct === 1) {
      setCountProduct(0);
      setSliderWidht(0);
    }
  }

  return (
    <div className={styles.product}>
      <div className={styles.product__wraper}>
        <h1 className={styles.product__title}>
          Hot prices
        </h1>
        <ProductsSlider
          sliderLeft={sliderLeft}
          sliderRight={sliderRight}

        />
      </div>

      <div
      className={styles.region}
      data-cy="cardsContainer"
    >
      <div
        className={styles.product__cart}
        style={{transform: `translateX(-${sliderWidht}px)`}}
      >
      {/* {product.map(phone => (
        <ProductCard
          phone={phone}
        />
      ))} */}
       {product.map(phone => (
        <div
          className={styles.product__phone}
          key={phone.id}
        >
          <ProductCard
            phone={phone}
          />
        </div>
      ))}
      </div>
    </div>
    </div>
  );
};
