import { Catalog } from '../shared/Catalog/Catalog';
import { Categories } from '../../types/Categories';
import { ProductContext } from '../shared/Context/Context';
import { useContext } from 'react';
import { Loader } from '../shared/Loader';
import { Error } from '../shared/Error';

export const Accessories = () => {
  const { products, isLoading, errorMessage } = useContext(ProductContext);
  const productsByCategory = products.filter(product => {
    return product.category === Categories.accessories;
  });

  return (
    <main className="main">
      <div className="catalog-aacessories">
        <div className="container">
          {isLoading && !errorMessage && <Loader />}
          {!isLoading && !errorMessage && (
            <Catalog
              title={'Accessories'}
              productsByCategory={productsByCategory}
            />
          )}
          {!isLoading && errorMessage && <Error />}
        </div>
      </div>
    </main>
  );
};
