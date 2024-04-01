import { useLocation } from 'react-router-dom';
import { getCategory } from '../../helper/utils';

export const NoResults = () => {
  const location = useLocation();
  const { pathname } = location;
  const product = getCategory(pathname);

  return <h1 className="title">{product} not found</h1>;
};
