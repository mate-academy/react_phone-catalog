import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductContext } from '../../helpers/ProductsContext';
import { Product } from '../../helpers/types';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    addTofavoritesHandler, addToCartHandler, addedToCart,
    favorites,
  } = useContext(ProductContext);
  const [searchParams] = useSearchParams();

  const isAddedToCart = addedToCart
    .find(item => item.phoneId === product.phoneId);
  const isAddedToFav = favorites
    .find(item => item.phoneId === product.phoneId);

  return (
    <article className="product-card">
      <div className="product-card__img-container">
        <Link
          to={`/${product.category}/${product.itemId}`}
          state={{ search: searchParams.toString() }}
          className="product-card__img-link"
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-card__img"
          />
        </Link>
      </div>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className="product-card__title-link"
        state={{ search: searchParams.toString() }}
      >
        <h2 className="product-card__title">{product.name}</h2>
      </Link>
      <p className="product-cars__prices">
        <span className="product-card__price">
          {`$${product.price}`}
        </span>
        <span className="product-card__full-price">
          {`$${product.fullPrice}`}
        </span>
      </p>

      <ul className="product-card__list">
        <li className="product-card__list-item">
          <p className="product-card__property-name">Screen</p>
          <p className="product-card__property-value">{product.screen}</p>
        </li>
        <li className="product-card__list-item">
          <p className="product-card__property-name">Capacity</p>
          <p className="product-card__property-value">{product.capacity}</p>
        </li>
        <li className="product-card__list-item">
          <p className="product-card__property-name">RAM</p>
          <p className="product-card__property-value">{product.ram}</p>
        </li>
      </ul>

      <div className="product-card__buttons">
        <button
          type="button"
          className={classNames(
            'wide-button',
            {
              'wide-button--active': isAddedToCart,
            },
          )}
          onClick={() => addToCartHandler(product.phoneId)}
        >
          {isAddedToCart
            ? 'Added to Cart'
            : 'Add to cart'}
        </button>

        <button
          type="button"
          aria-label="button-fav"
          className={classNames(
            'button button--fav',
            {
              'button--fav--chosen': isAddedToFav,
            },
          )}
          onClick={() => addTofavoritesHandler(product.phoneId)}
          data-cy="addToFavorite"
        />
      </div>
    </article>
  );
};
