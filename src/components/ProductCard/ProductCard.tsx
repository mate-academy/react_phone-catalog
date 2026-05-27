import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { cart, addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { theme } = useContext(ThemeContext);

  const isAdded = cart.some(cartItem => cartItem.product.id === product.id);
  const isProductFavorite = isFavorite(product.id);

  return (
    <article className="product-card">
      <Link to={`/product/${product.itemId}`} className="product-card__link">
        <img
          src={`/${product.image}`}
          alt={product.name}
          className="product-card__image"
        />
        <h3 className="product-card__title">{product.name}</h3>
      </Link>

      <div className="product-card__prices">
        <span className="product-card__price">${product.price}</span>
        <span className="product-card__full-price">${product.fullPrice}</span>
      </div>

      <div className="product-card__specs">
        <div className="product-card__spec">
          <span className="product-card__spec-name">Screen</span>
          <span className="product-card__spec-value">{product.screen}</span>
        </div>

        <div className="product-card__spec">
          <span className="product-card__spec-name">Capacity</span>
          <span className="product-card__spec-value">{product.capacity}</span>
        </div>

        <div className="product-card__spec">
          <span className="product-card__spec-name">RAM</span>
          <span className="product-card__spec-value">{product.ram}</span>
        </div>
      </div>

      <div className="product-card__actions">
        <button
          type="button"
          className={
            isAdded
              ? 'product-card__button product-card__button--added'
              : 'product-card__button'
          }
          onClick={() => addToCart(product)}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={
            isProductFavorite
              ? 'product-card__favorite product-card__favorite--active'
              : 'product-card__favorite'
          }
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={
              isProductFavorite
                ? '/img/icons/favourites-filled.svg'
                : theme === 'dark'
                  ? '/img/icons/favourites.svg'
                  : '/img/icons-light/favourites-light.svg'
            }
            alt="Favorite icon"
          />
        </button>
      </div>
    </article>
  );
};
