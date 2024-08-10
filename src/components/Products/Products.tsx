import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductsCard } from '../ProductsCard';
import './Products.scss';

type Props = {
  products: Product[];
  type?: 'slider' | '';
  cardTransform?: number;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  catalog?: boolean;
};

export const Products: React.FC<Props> = ({
  products,
  type,
  cardTransform = 0,
  onTouchStart = () => {},
  onTouchEnd = () => {},
  catalog,
}) => {
  return (
    <ul
      className={cn('products', {
        grid: catalog,
        products__slider: type === 'slider',
      })}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {products.map(product => (
        <li
          className={cn('products__card grid__item', {
            'products__card--slider': type === 'slider',
          })}
        >
          <ProductsCard product={product} transform={cardTransform} />
        </li>
      ))}
    </ul>
  );
};
