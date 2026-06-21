/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { ProductCard } from '@/modules/shared/components/ProductCard';
import { ProductType } from '@/modules/shared/utils/types';

import styles from './ProductsList.module.scss';
//#endregion

//#region STYLES
const { productsList } = styles;
//#endregion

interface Props {
  products: ProductType[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  //#region RENDER
  return (
    <div className={productsList}>
      {products.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
  //#endregion
};
