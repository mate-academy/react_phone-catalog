import { FC } from 'react';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList/ProductList';
import { Product } from '../../types/Product';

type Props = {
  isLoading: boolean;
  products: Product[] | [];
};

export const Phones: FC<Props> = ({ isLoading, products }) => {
  return (
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
};
