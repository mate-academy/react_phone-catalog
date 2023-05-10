import { FC } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ProductList } from '../../components/ProductList/ProductList';
import { Product } from '../../types/Product';

type Props = {
  isLoading: boolean;
  products: Product[] | [];
};

export const Tablets: FC<Props> = ({ isLoading, products }) => {
  return (
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
};
