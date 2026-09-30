import { Link } from 'react-router-dom';
import { Product } from '../../Types/types';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoriteContext';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();
  const findAddedItem = cart.some(item => item.product.id === product.id);
  const findFavItem = favorites.some(item => item.product.id === product.id);

  return (
    <div className="productCard">
      <Link to={`/product/${product.category}/${product.itemId}`}>
        <div className="productCard__container">
          <img
            className="productCard__img"
            src={product.image}
            alt="product photo"
          />
        </div>
        <span className="productCard__name">{product.name}</span>
      </Link>
      <section className="productCard__price">
        {product.price === product.fullPrice ? (
          <span>${product.price}</span>
        ) : (
          <>
            <span className="productCard__price--discount">
              ${product.price}
            </span>
            <span className="productCard__price--full">
              ${product.fullPrice}
            </span>
          </>
        )}
      </section>
      <hr className="productCard__divider" />
      <div className="productCard__info">
        <section className="productCard__info--section">
          <span className="productCard__info--section--title">Screen</span>
          <span className="productCard__info--section--value">
            {product.screen}
          </span>
        </section>
        <section className="productCard__info--section">
          <span className="productCard__info--section--title">Capacity</span>
          <span className="productCard__info--section--value">
            {product.capacity}
          </span>
        </section>

        <section className="productCard__info--section">
          <span className="productCard__info--section--title">RAM</span>
          <span className="productCard__info--section--value">
            {product.ram}
          </span>
        </section>
      </div>
      <div className="productCard__button">
        {findAddedItem ? (
          <button
            className="productCard__button--add--added"
            onClick={() => removeFromCart(product.itemId)}
          >
            Added
          </button>
        ) : (
          <button
            className="productCard__button--add"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        )}
        {findFavItem ? (
          <button
            className="productCard__button--heart"
            onClick={() => removeFromFavorite(product)}
          >
            <img
              src={`img/Icons/selected-heart-icon.svg`}
              alt="selected heart button"
            />
          </button>
        ) : (
          <button
            className="productCard__button--heart"
            onClick={() => addToFavorite(product)}
          >
            <img
              src={`img/Icons/unselected-heart-icon.svg`}
              alt="unselected heart button"
            />
          </button>
        )}
      </div>
    </div>
  );
};
