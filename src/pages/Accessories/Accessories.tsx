import { FC } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList';

type Props = {
  products: Product[];
  isLoading: boolean;
};

export const Accessories: FC<Props> = ({
  products,
  isLoading,
}) => (
  <div className="page__tablet">
    {isLoading ? (
      <div className="page__loader">
        <Loader />
      </div>
    ) : (
      <ProductList products={products} title="Accessories" />
    )}
  </div>
);
