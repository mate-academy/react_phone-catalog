import { Heart } from '../../images/icons/Heart';
import { FilledHeart } from '../../images/icons/FilledHeart';
import { useCart } from '../../hooks/useCart';
import type { Product } from '../../types/Product';

interface Props {
  product: Product;
}

export const FavoriteButton: React.FC<Props> = ({ product }) => {
  const { addToFavorites, removeFromFavorites, isInFavorites } = useCart();

  const isFavorite = isInFavorites(product);

  const handleToggle = () => {
    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="w-[40px] h-[40px] px-3 border border-icons dark:border-dark-icons hover:border-primary dark:hover:border-purple transition duration-300 ease-in-out cursor-pointer"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? <FilledHeart /> : <Heart />}
    </button>
  );
};
