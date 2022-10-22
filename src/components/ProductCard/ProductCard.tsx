import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { priceWithDiscount } from '../../helpers/priceWithDiscount';
import { Order } from '../Order';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const newPrice = priceWithDiscount(product);

  return (
    <div
      data-cy="cardsContainer"
      className="ProductCard"
    >
      <Link
        to={`/${product.type}s/${product.id}`}
      >
        <img
          className="ProductCard__img"
          src={product.imageUrl}
          alt={product.name}
        />
      </Link>
      <div className="ProductCard__name">
        <span className="text">{product.name}</span>
      </div>
      <h2 className="ProductCard__price">
        {`$${newPrice}`}
      </h2>
      {product.discount !== 0
        && (
          <h2 className="ProductCard__price ProductCard__price--old">
            {`$${product.price}`}
          </h2>
        )}
      <div className="row" />
      <div className="ProductCard__description details-table">
        <div className="details-table__grid">
          <div className="details-table__options">
            <span className="small-text small-text--light text--huge">
              Screen
            </span>
            <span className="small-text small-text--light text--huge">
              Capacity
            </span>
            <span className="small-text small-text--light text--huge">
              RAM
            </span>
          </div>
          <div className="details-table__values">
            <span className="small-text text--huge">
              {product.screen}
            </span>
            <span className="small-text text--huge">
              {product.capacity}
            </span>
            <span className="small-text text--huge">
              {product.ram}
            </span>
          </div>
        </div>
      </div>

      <Order
        currentProduct={product}
        buttonSize="small"
      />
    </div>
  );
};
