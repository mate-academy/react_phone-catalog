import { ProductCards } from '../../ProductCards/ProductCards';
import './Favorite.scss';
import products from '../../../_new/products.json';
import { useFavoriteContext } from '../../../FavoriteContext';

export const BlockFavorite = () => {
  const { favorites } = useFavoriteContext();
  const filtration = products.filter(
    (product) => favorites.includes(product.id.toString()),
  );

  return (
    <div className={`blockFavorite ${favorites.length === 0 ? 'blockFavorite-active' : ''}`}>
      {filtration.map((product) => (
        <ProductCards key={product.id} product={product} />
      ))}
    </div>
  );
};
