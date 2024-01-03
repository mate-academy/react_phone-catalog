import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Phone } from '../../Types/Phone';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';

type Props = {
  card: Phone,
  discount: boolean,
};

export const Card: React.FC<Props> = ({ card, discount = true }) => {
  const location = useLocation();
  const path = location.pathname.includes('phones')
    ? card.phoneId
    : `phones/${card.phoneId}`;

  const {
    cartPhones,
    setCartPhones,
    favourites,
    setFavourites,
  } = useProducts();

  const cardId = card.id || '';

  const addToFavourites = () => {
    if (favourites.find(i => i.id === cardId)) {
      return;
    }

    const newFavourites = [...favourites, card];

    setFavourites(newFavourites);
  };

  const removeFromFavourites = () => {
    const newFavourites = favourites.filter(i => i.id !== cardId);

    setFavourites(newFavourites);
  };

  const addToCart = () => {
    const newPhone = { id: cardId, quantity: 1, product: { ...card } };

    if (cartPhones.find(i => i.id === newPhone.id)) {
      return;
    }

    const setOfPhones = new Set([...cartPhones, newPhone]);

    const newPhones = Array.from(setOfPhones);

    setCartPhones(newPhones);
  };

  const cartPhonesIds = cartPhones.map(phone => phone.id);
  const favouritesPhonesIds = favourites.map(phone => phone.id);

  return (
    <div className="card">
      <NavLink to={path} className="card__nav-link">
        <img className="card__image" src={card.image} alt="phone_image" />
      </NavLink>
      <h3 className="card__name">{card.name}</h3>
      <div className="card__price">
        {discount ? (
          <>
            <p className="card__hot-price">{`$${card.price}`}</p>
            <p className="card__full-price">{`$${card.fullPrice}`}</p>
          </>
        ) : (
          <p className="card__hot-price">{`$${card.fullPrice}`}</p>
        )}
      </div>
      <div className="card__info">
        <div className="card__row">
          <p className="card__char-name">Screen</p>
          <p className="card__char-value">{card.screen}</p>
        </div>
        <div className="card__row">
          <p className="card__char-name">Capacity</p>
          <p className="card__char-value">{card.capacity}</p>
        </div>
        <div className="card__row">
          <p className="card__char-name">RAM</p>
          <p className="card__char-value">{card.ram}</p>
        </div>
      </div>
      <div className="card__button">
        <div
          onClick={addToCart}
          className={classNames('card__link', {
            'card__link--added': cartPhonesIds.includes(cardId),
          })}
          role="presentation"
        >
          {cartPhonesIds.includes(cardId) ? 'Added to cart' : 'Add to cart'}
        </div>
        {favouritesPhonesIds.includes(cardId) ? (
          <div
            className="card__icon card__icon--added"
            data-cy="addToFavorite"
            role="presentation"
            onClick={removeFromFavourites}
          />
        ) : (
          <div
            className="card__icon"
            data-cy="addToFavorite"
            role="presentation"
            onClick={addToFavourites}
          />
        )}
      </div>
    </div>
  );
};
