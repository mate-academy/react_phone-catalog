import { useContext } from 'react';
import { Categories } from '../../types/Categories';
import { Catalog } from '../shared/Catalog/Catalog';
import { ProductContext } from '../shared/Context/Context';
import { Loader } from '../shared/Loader';
import { Error } from '../shared/Error';

export const Phones = () => {
  const { products, isLoading, errorMessage } = useContext(ProductContext);
  const productsByCategory = products.filter(product => {
    return product.category === Categories.phones;
  });

  return (
    <main className="main">
      <div className="catalog-phones">
        <div className="container">
          {isLoading && !errorMessage && <Loader />}
          {!isLoading && !errorMessage && (
            <Catalog
              title={'Mobile phones'}
              productsByCategory={productsByCategory}
            />
          )}
          {!isLoading && errorMessage && <Error />}
        </div>
      </div>
    </main>
  );
};
