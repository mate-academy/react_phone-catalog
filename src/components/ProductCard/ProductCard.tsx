import '../../styles/components/ProductCard/ProductCard.scss';
import { Product } from '../../types/product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name, imageUrl, price, discount, screen, capacity, ram,
  } = product;

  const actualPrice = price - (price * discount) / 100;

  return (
    <div className="card">
      <img
        src={imageUrl}
        alt="phone img"
        className="card__image"
      />

      <p className="card__title">{name}</p>

      <div className="card__price-container">
        <p className="card__actual-price">{`$${actualPrice}`}</p>

        <p
          className="card__initial-price"
          hidden={discount === 0}
        >
          {`$${price}`}
        </p>
      </div>

      <div className="card__info-container">
        <div className="card__info-titles">
          <p className="card__info-title">Screen</p>
          <p className="card__info-title">Capacity</p>
          <p className="card__info-title">Ram</p>
        </div>
        <div className="card__info-values">
          <p className="card__info-value">{screen}</p>
          <p className="card__info-value">{capacity}</p>
          <p className="card__info-value">{ram}</p>
        </div>
      </div>

      <div className="card__buttons-container">
        <button type="button" className="card__add-button">Add to cart</button>

        <button type="button" className="card__fav-button">add to fav</button>
      </div>
    </div>
  );
};
