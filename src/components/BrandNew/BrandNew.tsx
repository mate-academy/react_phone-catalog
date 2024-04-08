import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import style from './BrandNew.module.scss';

export const BrandNew = () => {
  const { product: hotPrice } = useAppSelector(state => state.product);
  const [sliderWidht, setSliderWidht] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const chosenSort = true;
  const sliderRight = () => {
    if (sliderWidht === 0) {
      setSliderWidht((272.82 * 4) + (20 * 3));
      setCountProduct(8)
    } else {
      if (countProduct <= hotPrice.length) {
        setSliderWidht((carentValue) => carentValue + (272.82 * 4) + (20 * 3));
        setCountProduct(carentValue => carentValue + 4);
      }
    }
  }

  const sliderLeft = () => {
    if (sliderWidht >= 100) {
      setSliderWidht((carentValue) => carentValue - ((272.82 * 4) + (20 * 3)));

      setCountProduct(carentValue => carentValue - 4);
    }

    if (countProduct === 4) {
      setCountProduct(0);
      setSliderWidht(0);
    }
  }
  return (
    <div className={style.product}>
    <div className={style.product__wraper}>
      <h1 className={style.product__title}>
        Brand new models
      </h1>
      <ProductsSlider
        sliderLeft={sliderLeft}
        sliderRight={sliderRight}

      />
    </div>

    <ProductCard
      sliderWidht={sliderWidht}
      chosenSort={chosenSort}
    />
  </div>
  )
}