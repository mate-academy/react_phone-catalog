/* eslint-disable no-mixed-operators */
import './ProductCard.scss';
import '../../styles/utils/variables.scss';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/product';
import { Cart } from '../../types/cart';

type Props = {
  product: Product;
  moveLeft: number;
  handleSetCarts: (value: Product) => void;
  carts:Cart[];
  handleSetFavorites: (value:Product) => void;
  favorites: Product[];
};

const ButtonCartClassName = (carts:Cart[], product:Product) => cn(
  'add-button',
  { 'add-button--added': carts.some(cart => cart.id === product.id) },
);

export const ProductCard: React.FC<Props> = ({
  product, moveLeft, handleSetCarts, carts, handleSetFavorites, favorites,
}) => (
  <div
    className="card"
    style={{
      transform: `translateX(${moveLeft}px)`,
      transition: 'all 400ms ease-out',
    }}
  >
    <Link
      to={`/product/${product.id}`}
      className="card-link"
      onClick={() => {
        window.scrollTo({ top: 0 });
      }}
    >
      <img className="card__img" src={product.imageUrl} alt="card-img" />
      <p className="card-name card__card-name">
        {product.name}
      </p>
    </Link>

    <div className="prices-container card__prices-container">
      {product.discount > 0 ? (
        <>
          <p>
            {`$${product.price - (product.price / 100 * product.discount)}`}
          </p>
          <p className="prices-container__discount">{`$${product.price}`}</p>
        </>
      ) : (
        <p>{`$${product.price}`}</p>
      )}
    </div>

    <div className="card__details-container">
      <div className="details card__details">
        <span className="details-description">Screen</span>
        <span
          className="details-description details-description--seccondary"
        >
          {product.screen ? product.screen.replace(/ inches/g, '"') : 'no data'}
        </span>
      </div>

      <div className="details card__details">
        <span className="details-description">Capacity</span>
        <span
          className="details-description details-description--seccondary"
        >
          {product.capacity ? `${product.capacity.slice(0, -2)} ${product.capacity.slice(-2)}` : 'no data'}
        </span>
      </div>

      <div className="details card__details">
        <span className="details-description">Ram</span>
        <span
          className="details-description details-description--seccondary"
        >
          {product.ram ? `${product.ram.slice(0, -2)} ${product.ram.slice(-2)}` : 'no data'}
        </span>
      </div>
    </div>

    <div className="buttons-container card__buttons-container">
      <button
        type="button"
        className={ButtonCartClassName(carts, product)}
        onClick={() => handleSetCarts(product)}
      >
        {carts.some(cart => cart.id === product.id)
          ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        className="favourite-button"
        onClick={() => handleSetFavorites(product)}
        data-cy="addToFavorite"
      >
        {favorites.some(favorit => favorit.id === product.id) ? (
          <img src="./img/icons/favorit.svg" alt="#heartlike-added" />
        ) : (
          <img src="./img/icons/heartlike.svg" alt="#heartlike" />
        )}
      </button>
    </div>
  </div>
);
