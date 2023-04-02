import { Link } from 'react-router-dom';
import { getSalePrice } from '../../helpers/helpers';
import { Product } from '../../types/Product';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { FavouriteButton } from '../FavouriteButton/FavouriteButton';
import './card.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    price,
    ram,
    screen,
    capacity,
    imageUrl,
    discount,
    type,
  } = product;

  const priceWithDiscount = getSalePrice(price, discount);

  return (
    <div className="card">
      <Link to={`/${type === 'tablet' ? 'tablets' : 'phones'}/${id}`} className="card__link">
        <img className="card__img" src={imageUrl} alt="card" />
        <h3 className="card__title">
          {name}
        </h3>
      </Link>

      <div className="card__price">
        {`$${discount ? priceWithDiscount : price}`}

        {!!discount && (
          <span className="card__price--sale">
            {`$${price}`}
          </span>
        )}
      </div>
      <div className="card__line" />
      <div className="card__characteristics">
        <div className="card__characteristics-row">
          <span className="card__characteristics-title">
            Screen
          </span>
          <span className="card__characteristics-value">
            {screen}
          </span>
        </div>

        <div className="card__characteristics-row">
          <span className="card__characteristics-title">
            Capacity
          </span>

          <span className="card__characteristics-value">
            {capacity}
          </span>
        </div>

        <div className="card__characteristics-row">
          <span className="card__characteristics-title">
            RAM
          </span>
          <span className="card__characteristics-value">
            {ram}
          </span>
        </div>
      </div>

      <div className="card__buttons">
        <AddToCartButton height="40px" product={product} />

        <FavouriteButton size="40px" product={product} />
      </div>
    </div>
  );
};
