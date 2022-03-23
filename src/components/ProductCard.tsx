import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export interface Phone {
  age: number,
  id: string,
  type: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string
}

type Props = {
  favorite: string[],
  cart: string[],
  phone: Phone,
  handleCart: (id: string) => void,
  handleFavorite: (id: string) => void,
};

export const ProductCard: React.FC<Props> = ({
  favorite,
  cart,
  phone,
  handleCart,
  handleFavorite,
}) => {
  return (
    <div className="product-card">
      <NavLink to={`/${phone.type === 'accessory' ? 'accessorie' : phone.type}s/${phone.id}`}>
        <div className="product-card__image-container">
          <img src={phone.imageUrl} alt={phone.name} className="product-card__image" />
        </div>
        <div className="product-card__name">{phone.name}</div>
        <div className="product-card__price">
          <div
            className="product-card__price--discount"
          >
            {phone.discount !== 0
              ? `$${Math.floor(phone.price - (phone.price * (phone.discount / 100)))}`
              : `$${phone.price.toString()}`}
          </div>
          <div
            hidden={phone.discount === 0}
            className="product-card__price--initial"
          >
            {`$${phone.price.toString()}`}
          </div>
        </div>
        <div className="product-card__line" />
        <div className="product-card__description">
          <div className="product-card__description--property">Screen</div>
          <div className="product-card__description--value">{phone.screen}</div>
        </div>
        <div className="product-card__description">
          <div className="product-card__description--property">Capacity</div>
          <div className="product-card__description--value">{phone.capacity}</div>
        </div>
        <div className="product-card__description">
          <div className="product-card__description--property">RAM</div>
          <div className="product-card__description--value">{phone.ram}</div>
        </div>
      </NavLink>
      <div className="product-card__buttons">
        <button
          type="button"
          className={classNames('product-card__buttons--card',
            { 'in-card': cart.includes(phone.id) })}
          onClick={() => {
            handleCart(phone.id);
          }}
        >
          {cart.includes(phone.id) ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={classNames('product-card__buttons--favorite',
            { 'in-favorites': favorite.includes(phone.id) })}
          onClick={() => {
            handleFavorite(phone.id);
          }}
        >
          { }
        </button>
      </div>
    </div>
  );
};
