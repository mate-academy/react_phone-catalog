import { useBasketContext }
  from '../../../core/context/FavoriteContext/FavoriteContext';
import './PhonesPageInfoButton.scss';

interface Info {
  id: string;
}

interface InfoProps {
  info: Info;
}

export const PhonesPageInfoButton = ({ info }: InfoProps) => {
  const { id } = info;

  const {
    basket,
    addToBasket,
    removeFromBasket,
  } = useBasketContext();

  const isBasket = basket.some((item) => item.id === id.toString());

  const handleToggleBasket = () => {
    if (isBasket) {
      removeFromBasket(id.toString());
    } else {
      addToBasket(id.toString());
    }
  };

  return (
    <button
      data-cy="backButton"
      type="button"
      className={`card__buy-buttons ${isBasket ? 'is-activeButton' : ''
      }`}
      onClick={handleToggleBasket}
    // disabled={isAddedToCart}
    >
      {isBasket ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
