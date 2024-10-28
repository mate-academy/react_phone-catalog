import { Navigate, Outlet, useParams } from 'react-router-dom';
import { ValidCategories } from './constants/ValidCategories';

export const CategoryRoute = () => {
  const { category } = useParams();

  if (!category || !ValidCategories.includes(category)) {
    return <Navigate to="/notFound" />;
  }

  return <Outlet />;
};
