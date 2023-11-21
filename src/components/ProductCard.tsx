import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { AddToButtons } from './AddToButtons';
import './ProductCard.scss';

type Props = {
  product: Product;
};

const BUTTON_WIDTH = 178;
const BUTTON_HIGHT = 40;

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-card">
      <Link
        to={`/${product.category}/${product.itemId}`}
        data-cy="cardsContainer"
      >
        <div className="product-card__image-box">
          <img
            src={`./${product.image}`}
            className="product-card__image"
            alt={product.name}
          />
        </div>

        <h3 className="product-card__title">
          {product.name}
        </h3>

        <div className="product-card__price-box">
          <div className="product-card__price">
            {`$${product.price}`}
          </div>

          {product.price !== product.fullPrice && (
            <div className="product-card__full-price">
              {`$${product.fullPrice}`}
            </div>
          )}
        </div>

        <div className="product-card__line" />

        <div className="product-card__features">
          <div className="product-card__feature">
            Screen
            <span className="product-card__feature-value">
              {product.screen}
            </span>
          </div>

          <div className="product-card__feature">
            Capacity
            <span className="product-card__feature-value">
              {product.capacity}
            </span>
          </div>

          <div className="product-card__feature">
            Ram
            <span className="product-card__feature-value">
              {product.ram}
            </span>
          </div>
        </div>
      </Link>

      <div className="product-card__buttons">
        <AddToButtons
          width={BUTTON_WIDTH}
          height={BUTTON_HIGHT}
          product={product}
        />
      </div>
    </div>
  );
};
