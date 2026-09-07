import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import phones from '../../../../public/api/phones.json';
import type { Phone } from '../../../Types/type';
import style from './Hot-Prices.module.scss';
import { Link, useLocation } from 'react-router-dom';

interface HomePageProps {
  toggleFavourite: (product: Phone) => void;
  toggleInCart: (product: Phone) => void;
  favouriteButton: Set<string>;
  itemsInCart: Phone[];
}

export const HotPrices = ({
  toggleInCart,
  toggleFavourite,
  favouriteButton,
  itemsInCart,
}: HomePageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, phones.length - itemsPerPage);

  useLayoutEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        const width = cardRef.current.offsetWidth;
        const gap = 16;
        setCardWidth(width + gap);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

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
    <div
      {...handlers}
      className={`${style['newmodels']} ${style['newmodels--margin']}`}
    >
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

      <div className={style.newmodels__products} ref={sliderRef}>
        <div
          className={style.newmodels__products__slider}
          style={{
            transform: `translateX(-${currentIndex * cardWidth}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {sortedProduct.map((phone: Phone, index: number) => {
            const isFavourite = favouriteButton.has(phone.id);
            const IsInCart = itemsInCart.some(item => item.id === phone.id);

            return (
              <article
                className={style.newmodels__product}
                key={phone.id}
                ref={index === 0 ? cardRef : null}
              >
                <Link to={`/${currentPage}/${phone.id}`}>
                  <img
                    className={style.newmodels__product__image}
                    src={phone.images[0]}
                    alt={phone.name}
                    draggable={false}
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
                <hr className={style['newmodels__product--line']} />

                <div className={style.newmodels__product__description}>
                  <p className={style.newmodels__product__description__screen}>
                    Screen
                  </p>
                  <p
                    className={
                      style['newmodels__product__description__screen--number']
                    }
                  >
                    {phone.screen}
                  </p>
                </div>
                <div className={style.newmodels__product__description}>
                  <p
                    className={style.newmodels__product__description__capacity}
                  >
                    Capacity
                  </p>
                  <p
                    className={
                      style['newmodels__product__description__capacity--number']
                    }
                  >
                    {phone.capacity}
                  </p>
                </div>
                <div className={style.newmodels__product__description}>
                  <p className={style.newmodels__product__description__ram}>
                    RAM
                  </p>
                  <p
                    className={
                      style['newmodels__product__description__ram--number']
                    }
                  >
                    {phone.ram}
                  </p>
                </div>

                <div className={style.newmodels__product__buttons}>
                  <button
                    className={style.newmodels__product__buttons__button__add}
                    onClick={() => {
                      toggleInCart(phone);
                    }}
                  >
                    {IsInCart ? 'In a cart' : 'Add to cart'}
                  </button>
                  <button
                    className={
                      style.newmodels__product__buttons__button__favourites
                    }
                    onClick={() => toggleFavourite(phone)}
                  >
                    <span
                      className={`
                        ${style['newmodels__product__buttons__button__favourites--heart']}
                        ${isFavourite ? style['newmodels__product__buttons__button__favourites--heart--active'] : ''}
                        `}
                    ></span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
