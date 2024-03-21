import React, { memo, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

import './Breadcrumbs.scss';

import homeIcon from '../../images/icons/Home_icon.svg';

export const Breadcrumbs: React.FC = memo(() => {
  const { pathname } = useLocation();
  const params = useParams();

  const links = useMemo(() => {
    const pathParts = pathname.split('/').slice(1);

    return pathParts.map(part => {
      const pathName = `/${part}`;
      let name = part.charAt(0).toUpperCase() + part.slice(1);

      // prettier-ignore
      if (part.includes(':')) {
        name = params?.productId
          ? params.productId
            .slice(1)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/Iphone/g, 'iPhone')
            .replace(/gb/g, 'GB')
          : '';

        if (pathParts[0] === 'phones') {
          name += ' (iMT9G2FS/A)';
        }
      }

      return { pathName, name };
    });
  }, [pathname, params]);

  return (
    <div className="Breadcrumbs" data-cy="breadCrumbs">
      <Link to="/" className="Breadcrumbs__home">
        <img src={homeIcon} alt="Home Page" className="Breadcrumbs__icon" />
      </Link>
      {links.map(({ pathName, name }, index) => (
        <Link
          to={`${pathName}`}
          key={pathName}
          className={classNames('Breadcrumbs__link', {
            'Breadcrumbs__link--disabled': index === links.length - 1,
          })}
        >
          <span className="icon Breadcrumbs__chevron">
            <i className="fa-solid fa-chevron-right" />
          </span>

          <span className="Breadcrumbs__name">{name}</span>
        </Link>
      ))}
    </div>
  );
});
