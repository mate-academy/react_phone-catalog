import { useFavoriteContext } from '../../../FavoriteContext';
import { Product } from '../Product';
import './ProductsCardsButton.scss';

interface ProductFavoriteProps {
  product: Product;
}

export const ProductsCardsButton = ({ product }: ProductFavoriteProps) => {
  const { id } = product;

  const {
    basket,
    addToBasket,
    removeFromBasket,
  } = useFavoriteContext();
  const isBasket = basket.includes(id.toString());

  const handleToggleBasket = () => {
    if (isBasket) {
      removeFromBasket(id.toString());
    } else {
      addToBasket(id.toString());
    }
  };

  return (
    <button
      type="button"
      className={`card__buy-button ${isBasket ? 'is-activeButton' : ''
      }`}
      onClick={handleToggleBasket}
    // disabled={isAddedToCart}
    >
      {isBasket ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
