import { Path } from '../../components/Path/Path';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useFavorites } from '../../contexts/FavoritesContext';
import './Favorites.scss';

interface Props {}

export const Favorites: React.FC<Props> = ({}) => {
  const { favorites } = useFavorites();

  return (
    <div className="Favorites grid">
      <Path />
      <h1 className="Favorites-title">Favorites</h1>
      <span className="Favorites-amount">{favorites.length + ' items'}</span>
      <div className="PhonesPage-catalog grid--sub">
        {favorites.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
