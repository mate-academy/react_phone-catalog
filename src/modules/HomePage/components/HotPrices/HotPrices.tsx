import { useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import styles from '../HotPrices/HotPrices.module.scss';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import { ProductCard } from '../ProductCard';
import { getHotPriceProducts } from '../../../../api/sortProduct';

export const HotPrices = () => {
  const [sliderWidht, setSliderWidht] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const { phones } = useAppSelector(state => state.product);
  const widthContent = document.getElementById('phone')?.offsetWidth;
  const product = getHotPriceProducts(phones).splice(0, 20);
  const sliderRight = () => {
    if (sliderWidht === 0 && widthContent) {
      setSliderWidht(widthContent + 16);
      setCountProduct(2);
    } else {
      if (countProduct <= product.length - 1 && widthContent) {
        setSliderWidht(carentValue => carentValue + widthContent + 16);
        setCountProduct(carentValue => carentValue + 1);
      }
    }
  };

  const sliderLeft = () => {
    if (sliderWidht >= 100 && widthContent) {
      setSliderWidht(carentValue => carentValue - (widthContent + 16));

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
        <h1 className={styles.product__title}>Hot prices</h1>
        <ProductsSlider sliderLeft={sliderLeft} sliderRight={sliderRight} />
      </div>

      <div className={styles.region} data-cy="cardsContainer">
        <div
          className={styles.product__cart}
          style={{ transform: `translateX(-${sliderWidht}px)` }}
        >
          {product.map(phone => (
            <div className={styles.product__phone} key={phone.id}>
              <ProductCard phone={phone} isDiscount={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
