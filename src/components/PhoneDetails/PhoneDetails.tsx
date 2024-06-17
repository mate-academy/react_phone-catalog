import cn from 'classnames';
import { useState } from 'react';

export const PhoneDetails = ({ phone }) => {
  const [isFavActive, setIsFavActive] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);
  const handleCartButton = event => {
    event.preventDefault();
    setIsCartActive(!isCartActive);
  };

  const handleFavButton = event => {
    event.preventDefault();
    setIsFavActive(!isFavActive);
  };

  return (
    <>
      <div className="grid-item__price">
        {phone.discount !== 0 ? (
          <>
            <span className="discouunt-price">${phone.priceDiscount}</span>
            <span className="price">${phone.priceRegular}</span>
          </>
        ) : (
          <span className="price">${phone.price}</span>
        )}
      </div>
      <div className="grid-item__buttons card-button">
        <button
          onClick={handleCartButton}
          type="button"
          className={cn('card-button__cart card-button__item', {
            'card-button__cart--active': isCartActive,
          })}
        >
          {isCartActive ? 'Added to card' : 'Add to cart'}
        </button>
        <button
          onClick={handleFavButton}
          type="button"
          className="card-button__fav card-button__item"
        >
          {isFavActive ? (
            <img src="../img/svg/favorites_active.svg" alt="fav_active" />
          ) : (
            <img src="../img/svg/favorites.svg" alt="fav" />
          )}
        </button>
      </div>
      <ul className="grid-item__characteristics characteristics">
        <li className="characteristics__screen characteristics-info">
          <p className="characteristics-info__key">Screen</p>
          <p className="characteristics-info__value">{phone.screen}</p>
        </li>
        <li className="characteristics__capacity characteristics-info">
          <p className="characteristics-info__key">Capacity</p>
          <p className="characteristics-info__value">{phone.capacity}</p>
        </li>
        <li className="characteristics__ram characteristics-info">
          <p className="characteristics-info__key">RAM</p>
          <p className="characteristics-info__value">{phone.ram}</p>
        </li>
      </ul>
    </>
  );
};
