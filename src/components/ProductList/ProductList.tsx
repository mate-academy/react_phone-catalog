import { Product } from '../../types/Producst';
import { ProductCard } from '../ProductCard';
import s from './ProductList.module.scss';

type Props = {
  products: Product[] | undefined;
  firstItem?: number;
  lastItem?: number;
};

export const ProductList: React.FC<Props> = ({
  products,
  firstItem,
  lastItem,
}) => {
  return (
    <div className={s['product-list']}>
      {products?.slice(firstItem, lastItem).map(item => {
        return <ProductCard product={item} key={item.id} />;
      })}
    </div>
  );
};
