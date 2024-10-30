import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { PhoneFromServer } from '../../types/Phone';
import './CatalogItem.scss';
import { useContext, useEffect, useState } from 'react';
import { FavCartPhonesContext } from '../../contexts/FavCartPhonesContext';

interface Props {
  phone: PhoneFromServer;
}

export const CatalogItem: React.FC<Props> = ({ phone }) => {
  const {
    phonesInCart,
    setPhonesInCart,
    phonesInFav,
    setPhonesInFav,
    setSelectedPhonesInCartCount,
    setSelectedPhonesInFavCount,
  } = useContext(FavCartPhonesContext);
  const [isFavActive, setIsFavActive] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);

  useEffect(() => {
    setIsCartActive(phonesInCart.some(cartPhone => phone.id === cartPhone.id));
    setIsFavActive(phonesInFav.some(favPhone => favPhone.id === phone.id));
  }, [phonesInCart, phonesInFav, phone.id]);

  useEffect(() => {
    setSelectedPhonesInFavCount(phonesInFav.length);
  }, [setSelectedPhonesInFavCount, phonesInFav]);

  useEffect(() => {
    setSelectedPhonesInCartCount(phonesInCart.length);
  }, [setSelectedPhonesInCartCount, phonesInCart]);

  const handleCartButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsCartActive(!isCartActive);
    setPhonesInCart(prevPhones => {
      if (isCartActive) {
        return prevPhones.filter(cartPhone => cartPhone.id !== phone.id);
      } else {
        return [...prevPhones, phone];
      }
    });
    setSelectedPhonesInCartCount(prevCount =>
      isCartActive ? prevCount - 1 : prevCount + 1,
    );
  };

  const handleFavButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFavActive(!isFavActive);
    setPhonesInFav(prevPhone => {
      if (isFavActive) {
        return phonesInFav.filter(favPhone => phone.id !== favPhone.id);
      } else {
        return [...prevPhone, phone];
      }
    });

    setSelectedPhonesInFavCount(phonesInFav.length);
  };

  return (
    <Link className="gird-item__link" to={`/products/${phone.id}`}>
      <div className="grid-item__container grid-item__container--image">
        <img
          className="grid-item__image"
          src={`${phone.images[0]}`}
          alt={phone.name}
        />
      </div>
      <div className="grid-item__container">
        <p className="grid-item__name">{phone.name}</p>
      </div>
      <div className="grid-item__container">
        <div className="grid-item__price">
          {phone.priceDiscount !== 0 ? (
            <>
              <span className="discouunt-price">${phone.priceDiscount}</span>
              <span className="price">${phone.priceRegular}</span>
            </>
          ) : (
            <span className="price">${phone.priceRegular}</span>
          )}
        </div>
      </div>
      <div className="grid-item__container">
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
      </div>
      <div className="grid-item__container grid-item__container--buttons">
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
              <img src="img/svg/favorites_active.svg" alt="fav_active" />
            ) : (
              <img src="img/svg/favorites.svg" alt="fav" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};
