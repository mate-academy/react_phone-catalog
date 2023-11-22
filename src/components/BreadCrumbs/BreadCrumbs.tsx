import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import home from '../../icons/Home.svg';
import './BreadCrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();
  let currentLink = '';
  const [pathName, setPathName] = useState('');

  useEffect(() => {
    if (location) {
      const tmp = location.pathname
        .slice(location.pathname.lastIndexOf('/') + 1,
          location.pathname.length);

      setPathName(tmp);
    }
  }, []);

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`;

      return (
        <div className="crumb" key={crumb}>
          {pathName !== crumb
            ? (
              <Link
                to={currentLink}
                className="crumb__link"
              >
                {crumb}
              </Link>
            )
            : <p>{crumb}</p>}

        </div>
      );
    });

  return (
    <div className="breadcrumbs">
      <div className="crumb">
        <Link to="/" className="crumb__link">
          <img src={home.toString()} alt="home icon" />
        </Link>
      </div>
      {crumbs}
    </div>
  );
};
