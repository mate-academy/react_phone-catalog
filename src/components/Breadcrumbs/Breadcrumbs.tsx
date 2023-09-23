import { Link, useLocation } from 'react-router-dom';
import { capitalize, getDirectoryName } from '../../helpers/utils';

import './Breadcrumbs.scss';

type Props = {
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({
  productName = '',
}) => {
  const { pathname } = useLocation();
  const categoryName = capitalize(getDirectoryName(pathname));

  return (
    <div className="Breadcrumbs" data-cy="breadCrumbs">
      <Link to="/" className="Breadcrumbs__link Breadcrumbs__link--home">
        {' '}
      </Link>
      <div className="Breadcrumbs__separator">{' '}</div>

      {!productName ? (
        <p className="Breadcrumbs__category">
          {categoryName}
        </p>
      ) : (
        <Link to={`/${categoryName}`} className="Breadcrumbs__link">
          {categoryName}
        </Link>
      )}

      {productName && (
        <>
          <div className="Breadcrumbs__separator">{' '}</div>
          <p className="Breadcrumbs__product-name">{productName}</p>
        </>
      )}
    </div>
  );
};
