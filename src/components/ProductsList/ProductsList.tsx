import { FC } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { CartProductCard } from '../CartProductCard';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./ProductsList.module.scss');

const {
  ProductsList: productsList,
} = styles;

type Props = {
  products: Product[];

  className?: string;
  cardTransform?: number;
  modifier?: 'slider' | 'cart' | '';
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
};

export const ProductsList: FC<Props> = ({
  className = '',
  products,
  cardTransform = 0,
  modifier = '',
  onTouchStart = () => { },
  onTouchEnd = () => { },
}) => {
  return (
    <ul
      className={cn(
        productsList,
        className,
        { [styles[`ProductsList--${modifier}`]]: modifier },
      )}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {products.map(product => (
        <li
          key={product.productId}
        >
          {modifier === 'cart' ? (
            <CartProductCard
              product={product}
            />
          ) : (
            <ProductCard
              product={product}
              transform={cardTransform}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

ProductsList.defaultProps = {
  cardTransform: 0,
  modifier: '',
  onTouchStart: () => { },
  onTouchEnd: () => { },
  className: '',
};
