import { useContext } from 'react';
import { Catalog } from '../shared/Catalog/Catalog';
import { ProductContext } from '../shared/Context/Context';
import { Categories } from '../../types/Categories';
import { Loader } from '../shared/Loader';
import { Error } from '../shared/Error';

export const Tablets = () => {
  const { products, isLoading, errorMessage } = useContext(ProductContext);
  const productsByCategory = products.filter(product => {
    return product.category === Categories.tablets;
  });

  return (
    <main className="main">
      <div className="catalog-phones">
        <div className="container">
          {isLoading && !errorMessage && <Loader />}
          {!isLoading && !errorMessage && productsByCategory && (
            <Catalog
              title={'Tablets'}
              productsByCategory={productsByCategory}
            />
          )}
          {!isLoading && errorMessage && <Error />}
        </div>
      </div>
    </main>
  );
};
