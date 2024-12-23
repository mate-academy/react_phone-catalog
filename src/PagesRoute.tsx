import { Outlet, useParams, Navigate } from 'react-router-dom';
import { ProductCagetories } from './types/ProductCategories';

export const PagesRoute = () => {
  const { productsPage } = useParams();
  const isValidCategory =
    productsPage &&
    Object.values(ProductCagetories).includes(
      productsPage as ProductCagetories,
    );

  if (!isValidCategory) {
    return <Navigate to="/not-found" />;
  }

  return <Outlet />;
};
