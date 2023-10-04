import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BreadCrumbs } from '../componets/breadcrumbs/BreadCrumbs';
import { PageHeading } from '../componets/pageHeading/PageHeading';
import { getProducts } from '../redux/thunks/product.thunk';
import { ProductsList } from '../componets/productsList/ProductsList';

export const PhoneCatalogPage = () => {
  const modifiedProducts = useAppSelector(state => state.modifiedProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const amount = modifiedProducts.length;

  return (
    <div className="page__container">
      <BreadCrumbs title="Phone" link="/phones" />
      <PageHeading title="Mobile phones" amount={amount} />
      <ProductsList />
    </div>
  );
};
