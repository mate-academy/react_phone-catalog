import { useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import style from './BrandNew.module.scss';
import { ProductCard } from '../ProductCard';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import { getBrandNewProducts } from '../../../../api/sortProduct';

export const BrandNew = () => {
  const [sliderWidht, setSliderWidht] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const { phones } = useAppSelector(state => state.product);
  const widthContent = document.getElementById('phone')?.offsetWidth;
  const product = getBrandNewProducts(phones).splice(0, 20);

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
    <div className={style.product}>
      <div className={style.product__wraper}>
        <h1 className={style.product__title}>Brand new models</h1>
        <ProductsSlider sliderLeft={sliderLeft} sliderRight={sliderRight} />
      </div>

      <div className={style.region} data-cy="cardsContainer">
        <div
          className={style.product__cart}
          style={{ transform: `translateX(-${sliderWidht}px)` }}
        >
          {product.map(phone => (
            <div key={phone.id} className={style.product__phone} id="phone">
              <ProductCard phone={phone} isDiscount={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
