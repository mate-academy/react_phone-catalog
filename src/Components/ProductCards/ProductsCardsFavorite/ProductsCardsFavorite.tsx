import { useEffect, useState } from 'react';
import heartImage from './ProductsCardsFavoriteImage/heart.svg';
import './ProductsCardsFavorite.scss';
import { Product } from '../Product';

interface ProductFavoriteProps {
  product: Product;
}

export const ProductsCardsFavorite = ({ product }: ProductFavoriteProps) => {
  const { id } = product;

  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const localStorageIds = JSON.parse(localStorage.getItem('ids') || '[]');

    setFavorites(localStorageIds);
    setIsFavorite(localStorageIds.includes(id.toString()));
  }, [id]);

  const handleToggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);

    if (favorites.includes(id.toString())) {
      const updatedFavorites = favorites.filter(
        (favId) => favId !== id.toString(),
      );

      setFavorites(updatedFavorites);
      localStorage.setItem('ids', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, id.toString()];

      setFavorites(updatedFavorites);
      localStorage.setItem('ids', JSON.stringify(updatedFavorites));
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
