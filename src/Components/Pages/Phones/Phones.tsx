import { FC } from 'react';
import { Product } from '../../../types/Product';
import { Loader } from '../../Loader/Loader';
import { ProductList } from '../../Parts/ProductList/ProductList';

type Props = {
  products: Product[];
  isLoading: boolean;
};

export const Phones: FC<Props> = ({ products, isLoading }) => (
  <div className="page__phones">
    {isLoading ? (
      <div className="page__loader">
        <Loader />
      </div>
    ) : (
      <ProductList products={products} title="Mobile phones" />
    )}
  </div>
);
