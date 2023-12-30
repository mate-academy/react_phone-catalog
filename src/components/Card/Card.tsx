import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Phone } from '../../Types/Phone';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';

type Props = {
  card: Phone,
  discount: boolean,
};

export const Card: React.FC<Props> = ({ card, discount }) => {
  const location = useLocation();
  const path = location.pathname.includes('phones')
    ? card.phoneId
    : `phones/${card.phoneId}`;

  const { cartPhones, setCartPhones } = useProducts();

  const addToCart = (phone: Phone) => {
    const setOfPhones = new Set([...cartPhones, phone]);

    const newPhones: Phone[] = Array.from(setOfPhones);

    setCartPhones(newPhones);
  };

  const cartPhonesIds = cartPhones.map(phone => phone.id);

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
          onClick={() => addToCart(card)}
          className={classNames('card__link', {
            'card__link--added': cartPhonesIds.includes(card.id),
          })}
          role="presentation"
        >
          {cartPhonesIds.includes(card.id) ? 'Added to cart' : 'Add to cart'}
        </div>
        <div className="card__icon" />
      </div>
    </div>
  );
};
