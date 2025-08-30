// src/modules/catalog/components/ProductsList/ProductsList.tsx - Component to display a grid of products
import s from './ProductsList.module.scss';
import { Product } from '../../../../types';
import { ProductCard } from '../../../../shared/ProductCard';

type Props = { products: Product[] };

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={s.grid}>
      {products.map(p => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
};
