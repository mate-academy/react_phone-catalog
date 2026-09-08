import { useEffect } from 'react';
import { PageContent } from '../../components/PageContent';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import * as productsActions from '../../features/products';

export const AccessoriesPage = () => {
  const dispatch = useAppDispatch();
  const { products, loaded, hasError } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(productsActions.init());
  }, [dispatch]);

  const filteredProducts = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <PageContent
      products={filteredProducts}
      loaded={loaded}
      hasError={hasError}
      title={'Accessories'}
    />
  );
};
