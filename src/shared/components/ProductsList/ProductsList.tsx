import type { ProductListItem } from '../../api/types';
import { ProductCard } from '../ProductCard';
import s from '../ProductsList/ProductsList.module.scss';

export const ProductsList: React.FC<{ items: ProductListItem[] }> = ({
  items,
}) => {
  if (!items.length) {
    return null;
  }

  return (
    <section className={s.root}>
      {items.map(p => (
        <ProductCard key={`${p.itemId}`} product={p} />
      ))}
    </section>
  );
};
