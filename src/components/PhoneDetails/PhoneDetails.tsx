import cn from 'classnames';
import { useContext, useState, useEffect } from 'react';
import { FavCartPhonesContext } from '../../contexts/FavCartPhonesContext';
import { PhoneFromServer } from '../../types/Phone';

type Props = {
  phone: PhoneFromServer;
};

export const PhoneDetails: React.FC<Props> = ({ phone }) => {
  const {
    phonesInCart,
    setPhonesInCart,
    phonesInFav,
    setPhonesInFav,
    setSelectedPhonesInCartCount,
    setSelectedPhonesInFavCount,
  } = useContext(FavCartPhonesContext);

  useEffect(() => {
    setSelectedPhonesInFavCount(phonesInFav.length);
  }, [setSelectedPhonesInFavCount, phonesInFav]);

  useEffect(() => {
    setSelectedPhonesInCartCount(phonesInCart.length);
  }, [setSelectedPhonesInCartCount, phonesInCart]);

  const [isFavActive, setIsFavActive] = useState(
    phonesInFav.some(favtPhone => favtPhone.id === phone.id),
  );
  const [isCartActive, setIsCartActive] = useState(
    phonesInCart.some(cartPhone => cartPhone.id === phone.id),
  );
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
  };

  const handleFavButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFavActive(!isFavActive);

    setPhonesInFav(prevPhones => {
      if (isFavActive) {
        return prevPhones.filter(favPhone => favPhone.id !== phone.id);
      } else {
        return [...prevPhones, phone];
      }
    });
  };

  return (
    <>
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
