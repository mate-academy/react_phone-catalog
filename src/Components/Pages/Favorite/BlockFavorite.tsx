import { ProductCards } from '../../ProductCards/ProductCards';
import './Favorite.scss';
import products from '../../../new/products.json';
import { useFavoriteContext }
  from '../../../core/context/FavoriteContext/FavoriteContext';

export const BlockFavorite = () => {
  const { favorites } = useFavoriteContext();
  const filtration = products.filter(
    (product) => favorites.includes(product.id.toString())
      || favorites.includes(product.phoneId.toString()),
  );

  return (
    <div className={`blockFavorite ${favorites.length === 0 ? 'blockFavorite-active' : ''}`}>
      {filtration.map((product) => (
        <ProductCards key={product.phoneId} product={product} />
      ))}
    </div>
  );
};
