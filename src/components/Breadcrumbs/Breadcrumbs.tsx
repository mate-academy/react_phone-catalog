import { useLocation } from 'react-router-dom';

import iconHome from '../../helpers/icons/icon_home.svg';
import iconVector from '../../helpers/icons/icon_vector_disabled.svg';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  const path = location.pathname.split('/');

  const breadcrumbs = path.slice(1, path.length).map(breadcrumb => {
    return breadcrumb.charAt(0).toUpperCase()
      + breadcrumb.slice(1, breadcrumb.length);
  });

  return (
    <div className="Breadcrumbs">
      <img src={iconHome} alt="Home Icon" />
      <img src={iconVector} alt="Vector Icon" />
      <p className="Breadcrumbs__folder">{breadcrumbs[0]}</p>
    </div>
  );
};
