import classNames from 'classnames';
import { useCartContext } from '../context/CartContext';
import { useFavouritesContext } from '../context/FavouritesContext';
import { Product } from '../types/Product';
import './AddToButtons.scss';

type Props = {
  width: number;
  height: number;
  product?: Product;
};

export const AddToButtons: React.FC<Props> = ({ width, height, product }) => {
  const { cart, addToCart, removeFromCart } = useCartContext();
  const { favourites, setFavourites } = useFavouritesContext();
  const isInCart = cart.some(item => item.product.itemId === product?.itemId);
  const isFavourites = favourites
    .some(item => item.itemId === product?.itemId);

  const handleAddToCart = () => {
    if (!isInCart && product) {
      addToCart(product);
    }

    if (isInCart && product) {
      removeFromCart(product.itemId);
    }
  };

  const handleAddToFavourites = () => {
    if (product) {
      setFavourites(product);
    }
  };

  return (
    <div className="add-to-buttons">
      {product ? (
        <button
          type="button"
          className={classNames(
            'add-to-buttons__cart',
            { 'add-to-buttons__cart--added': isInCart },
          )}
          style={{ width, height }}
          onClick={handleAddToCart}
        >
          {!isInCart ? 'Add to cart' : 'Added to cart'}
        </button>
      ) : (
        <button
          type="button"
          className="add-to-buttons__cart add-to-buttons__cart--disable"
          style={{ width, height }}
        >
          Not available
        </button>
      )}

      <button
        type="button"
        className={classNames(
          'add-to-buttons__favourites',
          { 'add-to-buttons__favourites--selected': isFavourites },
        )}
        style={{ width: height, height }}
        aria-label="add to favourites"
        data-cy="addToFavorite"
        onClick={handleAddToFavourites}
      />
    </div>
  );
};
