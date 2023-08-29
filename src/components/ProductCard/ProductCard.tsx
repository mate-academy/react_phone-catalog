import { Product } from '../../types/product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name, imageUrl, price, screen, capacity, ram,
  } = product;

  return (
    <div className="card">
      <img
        src={imageUrl}
        alt="phone img"
        className="card__image"
      />

      <p className="card__title">{name}</p>

      <p className="card__price">{`&${price}`}</p>

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
