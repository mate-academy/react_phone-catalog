import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../libs/enums';

export const NoProducts: React.FC = () => (
  <div className="products-page__no-products">
    <h2>Oops!</h2>
    <p>There are currently no products on this page.</p>
    <p>
      {'Please consider returning to the '}
      <Link to={AppRoutes.ROOT}>homepage</Link>
      {' for more options.'}
    </p>
  </div>
);
