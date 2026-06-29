import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { useCardSize } from '../../hooks/useCardSize';
import style from './ProductsList.module.scss';

type Props = {
  data: Product[];
};
export const ProductsList: React.FC<Props> = ({ data }) => {
  const cardSize = useCardSize();

  return (
    <ul className={style.productList}>
      {data.map(product => (
        <li
          key={product.id}
          className={style.productItem}
          style={{ '--height': `${cardSize.height}px` } as React.CSSProperties}
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
