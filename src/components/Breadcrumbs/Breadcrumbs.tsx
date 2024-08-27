import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { AppContext } from '../../AppContext';
import { useContext } from 'react';

type Props = {
  className?: string;
};

function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Breadcrumbs: React.FC<Props> = ({ className = '' }) => {
  const { products } = useContext(AppContext);
  const pathnames = useLocation()
    .pathname.split('/')
    .filter(p => p !== '');

  const getBreadcrumbName = (pathname: string) => {
    const product = products.find(p => p.id === +pathname);

    if (product) {
      return product.name;
    }

    return capitalizeFirstLetter(pathname);
  };

  return (
    <ul className={`breadcrumbs ${className}`.trim()}>
      <li className="breadcrumbs__item">
        <NavLink className="breadcrumbs__btn" to="/">
          <Icon iconName="icon-home" />
        </NavLink>
      </li>
      {pathnames.map((pathname, index) => (
        <li className="breadcrumbs__item" key={pathname}>
          <Icon iconName="icon-arrow-right" />
          {index === pathnames.length - 1 ? (
            <NavLink
              className="breadcrumbs__link breadcrumbs__link--disabled"
              to={`/${pathname}`}
            >
              {getBreadcrumbName(pathname)}
            </NavLink>
          ) : (
            <NavLink className="breadcrumbs__link" to={`/${pathname}`}>
              {getBreadcrumbName(pathname)}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};
