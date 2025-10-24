import { useState } from 'react';
import product from '../../../../public/api/products.json';
import type { Product } from '../../../Types/type';
import style from './New-models.module.scss';

export const NewModels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const newProducts: Product[] = product.filter(
    (product: Product) => product.year === 2022,
  );

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, newProducts.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className={style.newmodels}>
      <div className={style.newmodels__topbar}>
        <h2 className={style.newmodels__topbar__title}>Brand new models</h2>
        <div className={style.newmodels__topbar__buttons}>
          <button
            className={style.newmodels__topbar__buttons__left}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            className={style.newmodels__topbar__buttons__right}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className={style.newmodels__products}>
        <div
          className={style.newmodels__products__slider}
          style={{
            transform: `translateX(-${currentIndex * (272 + 64 + 16)}px)`,
          }}
        >
          {newProducts.map((product: Product) => (
            <article className={style.newmodels__product} key={product.id}>
              <img
                className={style.newmodels__product__image}
                src={product.image}
                alt={product.itemId}
              />
              <p className={style.newmodels__product__name}>{product.name}</p>
              <h4 className={style.newmodels__product__price}>${product.price}</h4>
              <hr className={style[`newmodels__product--line`]} />

              <div className={style.newmodels__product__description}>
                <p className={style.newmodels__product__description__screen}>
                  Screen
                </p>
                <p className={style[`newmodels__product__description__screen--number`]}>
                  {product.screen}
                </p>
              </div>
              <div className={style.newmodels__product__description}>
                <p className={style.newmodels__product__description__capacity}>
                  Capacity
                </p>
                <p className={style[`newmodels__product__description__capacity--number`]}>
                  {product.capacity}
                </p>
              </div>
              <div className={style.newmodels__product__description}>
                <p className={style.newmodels__product__description__ram}>RAM</p>
                <p className={style[`newmodels__product__description__ram--number`]}>
                  {product.ram}
                </p>
              </div>

              <div className={style.newmodels__product__buttons}>
                <button className={style.newmodels__product__buttons__button__add}>
                  Add to cart
                </button>
                <button className={style.newmodels__product__buttons__button__favourites}>
                  <span className={style[`newmodels__product__buttons__button__favourites--heart`]}></span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
