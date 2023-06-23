import { Link, useLocation } from 'react-router-dom';

import heartIcon from '../../assets/svg/heart.svg';
import { Product } from '../../types/product';
import './ProductCard.scss';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({
  product: {
    image, name, price, screen, capacity, ram, fullPrice, itemId,
  },
}: ProductCardProps) => {
  const location = useLocation();

  return (
    <div className="product-card">
      <Link to={`/product/${itemId}`} className="product-card__link" state={{ prevPath: location.pathname.slice(1) }}>
        <img className="product-card__image" src={`_new/${image}`} alt={name} />

        <p className="product-card__name">{name}</p>
      </Link>
      <p className="product-card__price">
        {`$${price}`}
        {fullPrice - price > 0 && (
          <span className="product-card__price--strike">{`$${fullPrice}`}</span>
        )}
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

        <button type="button" className="product-card__button-icon">
          <img
            className="product-card__icon"
            src={heartIcon}
            alt="Add to favorites icon"
          />
        </button>
      </div>
    </div>
  );
};
