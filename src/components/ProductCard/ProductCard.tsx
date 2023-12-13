import { useOutletContext, NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import { FavoritesContextType } from '../../types/FavoritesContextType';

import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    favoritesItems,
    addToFavorites,
    removeFromFavorites,
    cartItems,
    addToCart,
    removeFromCart,
  }
    = useOutletContext<FavoritesContextType>();

  const containedInFavorites
    = favoritesItems.some(item => item.id === product.id);
  const containedInCart
    = cartItems.some(item => item.id === product.id);

  return (
    <div key={product.id} className="product-card">
      <NavLink to={`/product/${product.phoneId}`} className="product-card__link">
        <img
          src={`${product.image}`}
          alt={product.name}
        />
        <p className="product-name">{product.name}</p>
      </NavLink>
      <h2 className="price">
        $
        {product.price}
        {product.price !== product.fullPrice && (
          <span className="old-price">
            $
            {product.fullPrice}
          </span>
        )}
      </h2>
      <ul className="specs">
        <li>
          Screen
          <span className="specs__value">{product.screen}</span>
        </li>
        <li>
          Capacity
          <span className="specs__value">{product.capacity}</span>
        </li>
        <li>
          RAM
          <span className="specs__value">{product.ram}</span>
        </li>
      </ul>
      <div className="actions">
        <button
          type="button"
          className={containedInCart
            ? 'add-to-cart add-to-cart--selected' : 'add-to-cart'}
          onClick={() => {
            return containedInCart ? removeFromCart(product.id)
              : addToCart(product);
          }}
        >
          {containedInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          data-cy="addToFavorite"
          type="button"
          className="favorite"
          onClick={() => {
            return containedInFavorites ? removeFromFavorites(product.id)
              : addToFavorites(product);
          }}
        >
          <img
            src={containedInFavorites
              ? 'img/icons/favouritesSelected.svg'
              : 'img/icons/favourites.svg'}
            alt="Add to favorites"
            className="favorite__img"
          />
        </button>
      </div>
    </div>
  );
};
