import { useFavoriteContext }
  from '../../../core/context/FavoriteContext/FavoriteContext';
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
  const isBasket = basket.some((item) => item.id === phoneId.toString());

  const handleToggleBasket = () => {
    if (isBasket) {
      removeFromBasket(phoneId.toString());
    } else {
      addToBasket(phoneId.toString());
    }
  };

  return (
    <button
      data-cy="backButton"
      type="button"
      className={`card__buy-button ${isBasket ? 'is-activeButton' : ''
      }`}
      onClick={handleToggleBasket}
    >
      {isBasket ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
