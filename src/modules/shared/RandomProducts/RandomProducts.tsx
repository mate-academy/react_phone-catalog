import { useState } from 'react';
import { ProductCard } from '../../HomePage/components/ProductCard';
import { ProductsSlider } from '../../HomePage/components/ProductsSlider';
import styles from './RandomProducts.module.scss';
import { useAppSelector } from '../hooks/hooks';
import useSuggestedProducts from '../hooks/useSuggestedProducts';

export const RandomProducts = () => {
  const [sliderWidht, setSliderWidht] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const { products } = useAppSelector(state => state.product);
  const widthProduct = document.getElementById('widthPhone')?.offsetWidth;

  const { getSuggestedProducts } = useSuggestedProducts();

  const sliderRight = () => {
    if (sliderWidht === 0 && widthProduct) {
      setSliderWidht(widthProduct + 16);
      setCountProduct(2);
    } else {
      if (countProduct <= products.length && widthProduct) {
        setSliderWidht(carentValue => carentValue + widthProduct + 16);
        setCountProduct(carentValue => carentValue + 4);
      }
    }
  };

  const sliderLeft = () => {
    if (sliderWidht >= 100 && widthProduct) {
      setSliderWidht(carentValue => carentValue - (widthProduct + 16));

      setCountProduct(carentValue => carentValue - 1);
    }

    if (countProduct === 1) {
      setCountProduct(0);
      setSliderWidht(0);
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.product__wraper}>
        <h1 className={styles.product__title}>You may also like</h1>
        <ProductsSlider sliderLeft={sliderLeft} sliderRight={sliderRight} />
      </div>

      <div className={styles.region} data-cy="cardsContainer">
        <div
          className={styles.product__cart}
          style={{ transform: `translateX(-${sliderWidht}px)` }}
        >
          {getSuggestedProducts.map(phone => (
            <div
              id="widthPhone"
              className={styles.product__phone}
              key={phone.id}
            >
              <ProductCard phone={phone} isDiscount={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
