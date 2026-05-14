import type { Product } from '../../../types/Product';
import { Card } from '../Card/Card';
import s from './CardList.module.scss';

type Props = {
  products: Product[];
};

export const CardList = ({ products }: Props) => {
  return (
    <div className={s['card-list']}>
      {products.map(product => (
        <Card key={product.id} product={product} grid />
      ))}
    </div>
  );
};
