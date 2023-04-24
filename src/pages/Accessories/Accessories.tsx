import { FC } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ProductList } from '../../components/ProductList/ProductList';
import { Product } from '../../types/Product';

type Props = {
  isLoading: boolean;
  products: Product[] | [];
};

export const Accessories: FC<Props> = ({ isLoading, products }) => {
  return (
    <div className="page__accessories">
      {isLoading ? (
        <div className="page__loader">
          <Loader />
        </div>
      ) : (
        <ProductList products={products} title="Accessories" />
      )}
    </div>
  );
};
