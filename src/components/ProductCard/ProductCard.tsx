import hearIcon from '../../assets/heart.svg';
import { Product } from '../../types/product';
import './ProductCard.scss';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({
  product: {
    imageUrl, name, price, screen, capacity, ram, discount,
  },
}: ProductCardProps) => {
  return (
    <div className="product-card">
      <img className="product-card__image" src={imageUrl} alt="phone" />

      <p className="product-card__name">{name}</p>
      <p className="product-card__price">
        {`$${price - (price * (discount / 100))}`}
        {discount > 0 && <span className="product-card__price--strike">{`$${price}`}</span>}
      </p>

      <table>
        <tbody className="product-card__specification-table">
          <tr className="product-card__table-row">
            <td className="product-card__details">Screen</td>
            <td>{screen}</td>
          </tr>
          <tr className="product-card__table-row">
            <td className="product-card__details">Capacity</td>
            <td>{capacity}</td>
          </tr>
          <tr className="product-card__table-row">
            <td className="product-card__details">RAM</td>
            <td>{ram}</td>
          </tr>
        </tbody>
      </table>

      <div className="product-card__controls">
        <button className="product-card__button" type="button">
          Add to card
        </button>

        <button
          type="button"
          className="product-card__button-icon"
        >
          <img className="icon" src={hearIcon} alt="Add to favorites icon" />
        </button>
      </div>
    </div>
  );
};
