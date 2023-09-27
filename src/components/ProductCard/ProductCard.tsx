import { Favorites } from '../../img/Favorites';
import { Phone } from '../../types/phone';
import './productcard.scss';

type Props = {
  product: Phone;
  onlyFullPrice: boolean
};

export const ProductCard: React.FC<Props> = ({ product, onlyFullPrice }) => {
  return (
    <div
      className="product-card"
    >
      <div className="product-card__image-container">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <p className="product-card__title">{product.name}</p>

      <div className="product-card__price-container">
        <span className="product-card__price-new">
          {onlyFullPrice ? `$${product.fullPrice}` : `$${product.price}`}
        </span>

        {!onlyFullPrice && (
          <span className="product-card__price-old">
            {`$${product.fullPrice}`}
          </span>
        )}
      </div>

      <div className="product-card__underline" />

      <div className="product-card__description-container">
        <div className="product-card__description-item">
          <span className="product-card__description-title">Screen</span>
          <span className="product-card__description-detail">
            {product.screen}
          </span>
        </div>

        <div className="product-card__description-item">
          <span className="product-card__description-title">Capacity</span>
          <span className="product-card__description-detail">
            {product.capacity}
          </span>
        </div>

        <div className="product-card__description-item">
          <span className="product-card__description-title">RAM</span>
          <span className="product-card__description-detail">
            {product.ram}
          </span>
        </div>
      </div>

      <div className="product-card__buttons">
        <button type="button" className="product-card__button-add-cart">
          Add to cart
        </button>

        <button type="button" className="product-card__button-favorites">
          <Favorites />
        </button>
      </div>
    </div>
  );
};
