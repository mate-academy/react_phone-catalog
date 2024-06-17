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
  const { phonesInCart, setPhonesInCart, phonesInFav, setPhonesInFav } =
    useContext(FavCartPhonesContext);
  const [isFavActive, setIsFavActive] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);
  const linkStyles = { display: 'block', position: 'relative', zIndex: 1 };

  useEffect(() => {
    console.log(phonesInCart);
  }, [phonesInCart]);

  const handleCartButton = event => {
    event.preventDefault();
    setIsCartActive(!isCartActive);
    if (isCartActive) {
      setPhonesInCart((prevPhone) => {
        [...prevPhone, phone]
      });
    }
    console.log(phonesInCart);
  };

  const handleFavButton = event => {
    event.preventDefault();
    setIsFavActive(!isFavActive);
    if (isFavActive) {
      setPhonesInFav([...phonesInFav, phone]);
    }

    console.log(phonesInFav);
  };

  return (
    <Link style={linkStyles} to={`/products/${phone.id}`}>
      <div className="grid-item__container grid-item__container--image">
        <img
          className="grid-item__image"
          src={`/${phone.images[0]}`}
          alt={phone.name}
        />
      </div>
      <div className="grid-item__container">
        <p className="grid-item__name">{phone.name}</p>
      </div>
      <div className="grid-item__container">
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
              <img src="../img/svg/favorites_active.svg" alt="fav_active" />
            ) : (
              <img src="../img/svg/favorites.svg" alt="fav" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};
