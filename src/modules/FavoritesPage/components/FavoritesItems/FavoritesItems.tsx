import { Product } from '@/shared/types/Product';
import grid from '@/shared/styles/GridLayout.module.scss';
import { FavoritesItem } from '../FavoritesItem/FavoritesItem';

type Props = {
  products: Product[];
};

export const FavoritesItems: React.FC<Props> = ({ products }) => {
  return (
    <div className={grid.grid}>
      {products.map(product => (
        <FavoritesItem key={product.id} product={product} />
      ))}
    </div>
  );
};
