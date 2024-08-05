import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';
import classNames from 'classnames';
import { StateContext } from '../../../utils/GlobalStateProvider';

type Props = {
  path?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ path }) => {
  const location = useLocation();
  const { isDarkThemeOn } = useContext(StateContext);

  const directory = location.pathname.split('/');

  const pathnames = path ? [directory[1], path] : directory.slice(1);

  return (
    <nav className="breadcrumbs">
      <Link to="/">
        {isDarkThemeOn ? (
          <img src="img/icons/home.svg" alt="icon home" />
        ) : (
          <img src="img/icons/home-dark.svg" alt="icon home" />
        )}
      </Link>

      {pathnames.map(currentPath => (
        <React.Fragment key={currentPath}>
          <img src="img/icons/arrow-dark.svg" alt="" />
          {currentPath !== path && pathnames.length > 1 ? (
            <Link to={`/${pathnames[0]}`} className="product__text">
              <small
                style={{
                  textTransform: 'capitalize',
                  color: isDarkThemeOn ? '#f1f2f9' : '#313237',
                }}
                className={classNames('breadcrumbs__text', {
                  'breadcrumbs__text--active':
                    currentPath === pathnames[0] && pathnames.length > 1,
                })}
              >
                {currentPath}
              </small>
            </Link>
          ) : (
            <small
              style={{ textTransform: 'capitalize' }}
              className={classNames('breadcrumbs__text', {
                'breadcrumbs__text--active':
                  currentPath === pathnames[0] && pathnames.length > 1,
              })}
            >
              {currentPath}
            </small>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
