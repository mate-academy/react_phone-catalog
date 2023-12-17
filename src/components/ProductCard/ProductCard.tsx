import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

import './ProductCard.scss';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="ProductCard" data-cy="cardsContainer">
      <div className="ProductCard__container">
        <Link className="ProductCard__link" to={`/${product.category}/${product.phoneId}`}>
          <img
            src={`https://mate-academy.github.io/react_phone-catalog/_new/${product.image}`}
            alt={product.name}
            className="ProductCard__img"
          />

          <div className="ProductCard__name">
            {product.name}
          </div>
        </Link>

        <div className="ProductCard__info">
          <div className="ProductCard__cost">
            <div className="ProductCard__cost--discount">
              {`$${product.price}`}
            </div>

            <div className="ProductCard__cost--fullPrice">
              {`$${product.fullPrice}`}
            </div>
          </div>

          <div className="ProductCard__line" />

          <div className="ProductCard__properties">
            <div className="ProductCard__property">
              <div className="ProductCard__property--normal">
                Screen
              </div>
              <div className="ProductCard__property--strong">
                {product.screen}
              </div>
            </div>

            <div className="ProductCard__property">
              <div className="ProductCard__property--normal">
                Capacity
              </div>
              <div className="ProductCard__property--strong">
                {product.capacity}
              </div>
            </div>

            <div className="ProductCard__property">
              <div className="ProductCard__property--normal">
                Ram
              </div>
              <div className="ProductCard__property--strong">
                {product.ram}
              </div>
            </div>
          </div>
        </div>

        <div className="ProductCard__buttons">
          <button
            type="button"
            className="ProductCard__button__cart"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="ProductCard__button__fav"
            aria-label="Add to Favorites"
          />
        </div>
      </div>
    </div>
  );
};
