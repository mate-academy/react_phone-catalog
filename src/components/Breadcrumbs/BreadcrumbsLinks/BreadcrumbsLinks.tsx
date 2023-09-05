import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getFormattedCrumb } from '@/helpers/getFormattedCrumb';

export const BreadcrumbsLinks = memo(() => {
  const location = useLocation();

  const crumbs = useMemo(() => {
    return location.pathname.split('/').filter(crumb => !!crumb);
  }, [location]);

  return (
    <>
     {crumbs.map((crumb, index, arr) => {
          const formattedCrumb = getFormattedCrumb(crumb);

          return (
            <li
              key={crumb}
              className="Breadcrumbs__item"
            >
              {index !== arr.length - 1
                ? (
                  <Link to={`/${crumb}`}>
                    {formattedCrumb}
                  </Link>
                )
                : formattedCrumb}
            </li>
          );
        })}
    </>
  );
});
