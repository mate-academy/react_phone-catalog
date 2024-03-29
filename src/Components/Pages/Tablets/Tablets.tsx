import { FC } from 'react';
import { Product } from '../../../types/Product';
import { Loader } from '../../Loader/Loader';
import { ProductList } from '../../Parts/ProductList/ProductList';

type Props = {
  products: Product[];
  isLoading: boolean;
};

export const Tablets: FC<Props> = ({ products, isLoading }) => (
  <div className="page__tablet">
    {isLoading ? (
      <div className="page__loader">
        <Loader />
      </div>
    ) : (
      <ProductList products={products} title="Tablets" />
    )}
  </div>
);
