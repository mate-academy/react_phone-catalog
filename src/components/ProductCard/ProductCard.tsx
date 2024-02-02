import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../type/Product';
import { CartContext } from '../../context/CartContext';
import { FavouritesContext } from '../../context/FavouritesContext';
import { useLocalStorageState } from '../../helpers/localSrorage';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleCartItem, cartItems } = useContext(CartContext);
  const { favouritesItems, toggleFavourite } = useContext(FavouritesContext);

  const [
    isFavourite,
    setIsFavourite,
  ] = useLocalStorageState<boolean>('isFavourite', false);
  const isInCart = cartItems.some((item) => item.id === +product.id);

  useEffect(() => {
    setIsFavourite(favouritesItems
      .some((item) => item.product.id === product.id));
  }, [favouritesItems, product]);

  const handleAddToFavourites = () => {
    toggleFavourite(product);
    setIsFavourite((prev) => !prev);
  };

  const handleAddToCart = () => {
    toggleCartItem({
      id: +product.id,
      quantity: 1,
      product,
      price: product.price,
    });
  };

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

          <div
            className="phone__name"
            >
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
              className="phone__criteria--big"
            >
              Screen
            </div>
            <div className="phone__criteria--small">
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
        <button
          type="button"
          className={`button__cart ${isInCart ? 'is-added' : ''}`}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>

        <button
          type="button"
          className={`button__fav ${isFavourite ? 'is-fav' : ''}`}
          aria-label="Add to Favorites"
          onClick={handleAddToFavourites}
        />
      </div>
    </div>
  );
};
