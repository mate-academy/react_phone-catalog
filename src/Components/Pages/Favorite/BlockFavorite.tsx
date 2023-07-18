import { ProductCards } from '../../ProductCards/ProductCards';
import './Favorite.scss';
import products from '../../../_new/products.json';

export const BlockFavorite = () => {
  const Ids = JSON.parse(localStorage.getItem('ids') || '[]');
  const filtration = products.filter((product) => Ids.includes(product.id));

  return (
    <div
      className={`blockFavorite ${Ids.length === 0 ? 'blockFavorite-active' : ''}`}
    >

      {filtration.map((product) => (
        <ProductCards key={product.id} product={product} />
      ))}
    </div>
  );
};
