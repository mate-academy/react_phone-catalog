import { Navigate, useParams } from 'react-router-dom';
import { AppPathRoute } from 'types/AppPathRoute';
import { ProductsContent } from './components/ProductsContent';

export const ProductsPage = () => {
  const { type } = useParams();

  const isValidType = (value: string): value is AppPathRoute => {
    return Object.values(AppPathRoute).includes(value as AppPathRoute);
  };

  if (!type || !isValidType(type)) {
    return <Navigate to="/not-found" replace />;
  }

  return <ProductsContent />;
};
