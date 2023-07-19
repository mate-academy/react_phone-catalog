import heartImage from './ProductsCardsFavoriteImage/heart.svg';
import './ProductsCardsFavorite.scss';
import { Product } from '../Product';
import { useFavoriteContext } from '../../../FavoriteContext'; // Укажите правильный путь к FavoriteContext

interface ProductFavoriteProps {
  product: Product;
}

export const ProductsCardsFavorite = ({ product }: ProductFavoriteProps) => {
  const { id } = product;
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useFavoriteContext();
  const isFavorite = favorites.includes(id.toString());

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id.toString());
    } else {
      addToFavorites(id.toString());
    }
  };

  return (
    <div
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
