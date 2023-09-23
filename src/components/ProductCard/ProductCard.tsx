import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

import './ProductCard.scss';

enum PropertyNames {
  Screen = 'screen',
  Capacity = 'capacity',
  Ram = 'ram',
}

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { price, discount } = product;
  const discountPrice = price * ((100 - discount) / 100);

  const normalizePropertyValue = (name: PropertyNames) => {
    if (!product[name]) {
      return '-';
    }

    if (name === PropertyNames.Screen) {
      return `${product[name].slice(0, -6)}"`;
    }

    return `${Math.round(+product[name].slice(0, -2) / 100) / 10} GB`;
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleAddToFavourites = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <Link
      to={product.id}
      className="ProductCard"
      data-cy="cardsContainer"
    >
      <div className="ProductCard__image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="ProductCard__image"
        />
      </div>

      <div className="ProductCard__info">
        <h2 className="ProductCard__title">{product.name.toLowerCase()}</h2>

        <div className="ProductCard__price">
          <span className="ProductCard__discount-price">
            &#36;
            {discountPrice}
          </span>

          {discount > 0 && (
            <span className="ProductCard__total-price">
              &#36;
              {price}
            </span>
          )}
        </div>

        <ul className="ProductCard__properties">
          {Object.values(PropertyNames).map(name => (
            <li key={name} className="ProductCard__property">
              <span
                className={classNames('ProductCard__property-name', {
                  'ProductCard__property-name--ram': name === PropertyNames.Ram,
                })}
              >
                {name}
              </span>

              <span className="ProductCard__property-value">
                {normalizePropertyValue(name)}
              </span>
            </li>
          ))}
        </ul>

        <div className="ProductCard__buttons">
          <button
            type="button"
            className="ProductCard__add-to-cart"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>

          <button
            type="button"
            aria-label="Add to favourites"
            className="ProductCard__add-to-favourites"
            onClick={handleAddToFavourites}
          />
        </div>
      </div>
    </Link>
  );
};
