import heartImage from './ProductsCardsFavoriteImage/heart.svg';
import './ProductsCardsFavorite.scss';
import { Product } from '../Product';
import { useFavoriteContext }
  from '../../../core/context/FavoriteContext/FavoriteContext'; // Укажите правильный путь к FavoriteContext

interface ProductFavoriteProps {
  product: Product;
}

export const ProductsCardsFavorite = ({ product }: ProductFavoriteProps) => {
  const { phoneId } = product;
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useFavoriteContext();
  const isFavorite = favorites.includes(phoneId.toString());

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(phoneId.toString());
    } else {
      addToFavorites(phoneId.toString());
    }
  };

  return (
    <div
      data-cy="addToFavorite"
      className={`hear-image-cadr ${isFavorite ? 'is-activeButton' : ''}`}
      onClick={handleToggleFavorite}
      onKeyDown={handleToggleFavorite}
      role="button"
      tabIndex={0}
    >
      <img src={heartImage} className="heard-cards" alt="card-heart" />
    </div>
  );
};
