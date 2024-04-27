import { useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import style from './BrandNew.module.scss';
import { ProductCard } from '../ProductCard';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const BrandNew = () => {
  const { products: hotPrice } = useAppSelector(state => state.product);
  const [sliderWidht, setSliderWidht] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const { products: product } = useAppSelector(state => state.product);
  // const chosenSort = true;
  const sliderRight = () => {
    if (sliderWidht === 0) {
      setSliderWidht(272 + 16);
      setCountProduct(2)
    } else {
      if (countProduct <= hotPrice.length) {
        setSliderWidht((carentValue) => carentValue + 272 + 16);
        setCountProduct(carentValue => carentValue + 1);
      }
    }
  }

  // const r = document.querySelector('#phoneWidth')
  // const n = r.offsetWidth;

  // console.log(n)

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

    <div
      className={style.region}
      data-cy="cardsContainer"
    >
      <div
        className={style.product__cart}
        style={{transform: `translateX(-${sliderWidht}px)`}}
      >
      {product.map(phone => (
        <div
          key={phone.id}
          className={style.product__phone}
        >
          <ProductCard
            phone={phone}
          />
        </div>
      ))}
      </div>
    </div>

  </div>
  )
}