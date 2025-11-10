import { useState } from 'react';
import phones from '../../../../public/api/phones.json';
import type { Phone } from '../../../Types/type';
import style from './Hot-Prices.module.scss';
import { Link, useLocation } from 'react-router-dom';

export const HotPrices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, phones.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const sortedProduct = phones.sort((a, b) => b.priceRegular - a.priceRegular);


  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;

    if (path.includes('/phones')) {
      return 'phones';
    } else if (path.includes('/tablets')) {
      return 'tablets';
    } else if (path.includes('/accessories')) {
      return 'accessories';
    }

    return 'phones';
  };

  const currentPage = getCurrentPage();
  return (
    <div className={style.newmodels}>
      <div className={style.newmodels__topbar}>
        <h2 className={style.newmodels__topbar__title}>Hot prices</h2>
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
          {sortedProduct.map((phone: Phone) => (
            <article className={style.newmodels__product} key={phone.id}>
              <Link to={`/${currentPage}/${phone.id}`}>
                <img
                  className={style.newmodels__product__image}
                  src={phone.images[0]}
                  alt={phone.id}
                />
              </Link>
              <p className={style.newmodels__product__name}>{phone.name}</p>
              <div className={style.newmodels__product__prices}>
                <h4 className={style.newmodels__product__prices__price}>
                  ${phone.priceDiscount}
                </h4>
                <h4 className={style.newmodels__product__prices__discount}>
                  ${phone.priceRegular}
                </h4>
              </div>
              <hr className={style[`newmodels__product--line`]} />

              <div className={style.newmodels__product__description}>
                <p className={style.newmodels__product__description__screen}>
                  Screen
                </p>
                <p className={style[`newmodels__product__description__screen--number`]}>
                  {phone.screen}
                </p>
              </div>
              <div className={style.newmodels__product__description}>
                <p className={style.newmodels__product__description__capacity}>
                  Capacity
                </p>
                <p className={style[`newmodels__product__description__capacity--number`]}>
                  {phone.capacity}
                </p>
              </div>
              <div className={style.newmodels__product__description}>
                <p className={style.newmodels__product__description__ram}>RAM</p>
                <p className={style[`newmodels__product__description__ram--number`]}>
                  {phone.ram}
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
