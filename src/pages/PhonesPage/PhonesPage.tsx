import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import * as productsActions from '../../features/products';
import { PageContent } from "../../components/PageContent";

export const PhonesPage = () => {
  const dispatch = useAppDispatch();
  const { products, loaded, hasError } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(productsActions.init());
  }, [dispatch]);

  const filteredProducts = products.filter(product => product.category === 'phones');

  return (
    <PageContent
      products={filteredProducts}
      loaded={loaded}
      hasError={hasError}
      title={'Mobile phones'}
    />
  );
};
