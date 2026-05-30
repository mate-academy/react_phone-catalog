import { Outlet, useParams } from 'react-router-dom';
import { CATEGORIES } from '../../constants';
import { NotFoundPage } from '../NotFoundPage';

export const CategoryWrapperPage = () => {
  const { category } = useParams();

  if (!Object.values(CATEGORIES).includes(category as string)) {
    return <NotFoundPage />;
  }

  return <Outlet />;
};
