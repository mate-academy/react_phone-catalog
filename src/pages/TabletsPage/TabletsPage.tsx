import { useEffect } from 'react';
import { PageContent } from '../../components/PageContent';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import * as productsActions from '../../features/products';

export const TabletsPage = () => {
  const dispatch = useAppDispatch();
  const { products, loaded, hasError } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(productsActions.init());
  }, [dispatch]);

  const filteredProducts = products.filter(
    product => product.category === 'tablets',
  );

  return (
    <PageContent
      products={filteredProducts}
      loaded={loaded}
      hasError={hasError}
      title={'Tablets'}
    />
  );
};
