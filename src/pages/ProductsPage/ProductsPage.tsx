import React, { memo } from 'react';
import ProductsList from '../../components/common/ProductsList';
import './ProductsPage.scss';
import Loader from '../../components/UI/Loader';
import { useAppParams } from '../../enhancers/hooks/appParams';
import ErrorMessage from '../../components/common/ErrorMessage';
import { capitalize } from '../../utils/stringHelper';
import { useRequest } from '../../enhancers/hooks/request';
import { getProductsAmount, getProductsByPage } from '../../api/products';

export const ProductsPage: React.FC = memo(() => {
  const { category } = useAppParams();
  const [productsAmount] = useRequest(() => getProductsAmount(category));
  const [products, loading, error] = useRequest(
    () => getProductsByPage(category, { page: 1, perPage: 16 }),
    null,
    [category]
  );

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="products-page">
      <h2 className='products-page__title'>{capitalize(category)}</h2>

      {!loading && products && (<>
        <p>
          <data value={productsAmount || ''}>
            {productsAmount}
          </data> models
        </p>

        <ProductsList products={products} />
      </>)}

      {loading && <Loader size={100} className="products-page__loader" />}
    </div>
  );
});
