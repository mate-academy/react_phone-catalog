import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ICONS } from '../../../constants/icons';
import { Typography } from '../../atoms/Typography/Typography';

interface BreadcrumbsProps {
  customItems?: Array<{ label: string; path: string }>;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customItems }) => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    favourites: 'Favourites',
    cart: 'Cart',
  };

  if (!customItems && pathnames.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 h-4">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center"
          >
            <span
              aria-hidden="true"
              className="inline-block w-4 h-4 bg-current bg-no-repeat bg-center"
              style={{
                maskImage: `url(${ICONS.HOME})`,
                WebkitMaskImage: `url(${ICONS.HOME})`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
              }}
            />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = breadcrumbNameMap[value] || value;

          return (
            <li
              key={to}
              className="flex gap-2"
            >
              <span className="text-icons flex items-center">
                <img
                  src={ICONS.ARROW.RIGHT}
                  alt="arrow"
                  className="w-4 h-4"
                />
              </span>
              <span className="flex items-center">
                {isLast ?
                  <Typography
                    level="body"
                    className="text-secondary dark:text-secondary"
                  >
                    {label}
                  </Typography>
                : <Link to={to}>
                    <Typography
                      level="body"
                      className="hover:underline text-primary dark:text-white"
                    >
                      {label}
                    </Typography>
                  </Link>
                }
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
