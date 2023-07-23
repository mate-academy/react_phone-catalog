import { useFavoriteContext } from '../../../FavoriteContext';
import { Product } from '../Product';
import './ProductsCardsButton.scss';

interface ProductFavoriteProps {
  product: Product;
}

export const ProductsCardsButton = ({ product }: ProductFavoriteProps) => {
  const { phoneId } = product;

  const {
    basket,
    addToBasket,
    removeFromBasket,
  } = useFavoriteContext();
  const isBasket = basket.includes(phoneId.toString());

  const handleToggleBasket = () => {
    if (isBasket) {
      removeFromBasket(phoneId.toString());
    } else {
      addToBasket(phoneId.toString());
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
