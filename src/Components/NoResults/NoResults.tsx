import { useLocation } from 'react-router-dom';
import { getCategory } from '../../helper/utils';
import './NoResult.scss';

export const NoResults = () => {
  const location = useLocation();
  const { pathname } = location;
  const product = getCategory(pathname) || 'Product was';

  return (
    <div className="noResult">
      <h1 className="title">{product} not found</h1>
    </div>
  );
};
