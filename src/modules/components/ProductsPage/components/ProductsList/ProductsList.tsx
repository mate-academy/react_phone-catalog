/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

import { ProductCard } from '@/modules/shared/components/ProductCard';
import { ProductType } from '../../../../shared/utils/types';

import styles from './ProductsList.module.scss';

const { container } = styles;

interface Props {
  products: ProductType[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={container}>
      {products.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
