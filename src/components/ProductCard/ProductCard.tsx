import { Link } from 'react-router-dom';
import { Product } from '../../type/Product';
import './ProductCard.scss';
import { CartButton } from '../CartButton/CartButton';
import { FavouritesButton } from '../FavouritesButton/FavouritesButton';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card" data-cy="cardsContainer">
      <li
        className="phone"
      >
        <Link className="phone__link" to={`/${product.category}/${product.phoneId}`}>
          <img
            src={`https://mate-academy.github.io/react_phone-catalog/_new/${product.image}`}
            alt={product.name}
            className="phone__img"
          />

          <div className="phone__name">
            {product.name}
          </div>
        </Link>

        <div className="phone__cost">
          <div className="phone__cost--discount">
            {`$${product.price}`}
          </div>

          <div className="phone__cost--real">
            {`$${product.fullPrice}`}
          </div>
        </div>

        <div className="phone__border" />

        <div className="phone__criteria">
          <div className="phone__criteria--container">
            <div
              className="
              phone__criteria--big
            "
            >
              Screen
            </div>
            <div
              className="
              phone__criteria--small
            "
            >
              {product.screen}
            </div>
          </div>

          <div className="phone__criteria--container">
            <div
              className="
            phone__criteria--big
            "
            >
              Capacity
            </div>
            <div
              className="
            phone__criteria--small
            "
            >
              {product.capacity}
            </div>
          </div>

          <div className="phone__criteria--container">
            <div
              className="
            phone__criteria--big
            "
            >
              Ram
            </div>
            <div
              className="
            phone__criteria--small
            "
            >
              {product.ram}
            </div>
          </div>
        </div>
      </li>

      <div className="phone__buttons">
        <CartButton />
        <FavouritesButton />
      </div>
    </div>
  );
};
