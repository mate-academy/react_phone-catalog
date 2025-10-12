import './favoritesAddButton.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Product } from '../../types/Product';

type Props = {
  productId: number;
  product: Product;
};

export const FavoritesAddButton = ({ productId, product }: Props) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isCart } = useCart();

  return (
    <div className="add-favorites-container">
      {!isCart(productId) ? (
        <button
          className="add-button has-shadow-cursor"
          onClick={() => addToCart(product)}
        >
          <p className="button-text">Add to cart</p>
        </button>
      ) : (
        <button
          className="add-button has-shadow-cursor added"
          onClick={() => addToCart(product)}
        >
          <p className="button-text">Added to cart</p>
        </button>
      )}

      <button
        className="favorites-button has-shadow-cursor"
        onClick={() => toggleFavorite(product)}
      >
        {!isFavorite(productId) ? (
          <img
            className="icon iconLike"
            src="./img/iconLike.svg"
            alt="favorites img"
          />
        ) : (
          <img
            className="icon iconLike"
            src="./img/heart-filled.svg"
            alt="favorites img"
          />
        )}
      </button>
    </div>
  );
};
