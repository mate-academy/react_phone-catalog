import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getFormattedCrumb } from '@/helpers/getFormattedCrumb';

export const BreadcrumbsParts = () => {
  const locationPath = useLocation().pathname;

  const crumbs = useMemo(() => {
    return locationPath.split('/')
      .filter(crumb => !!crumb)
      .map((crumb, index, arr) => {
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
      });
  }, [locationPath]);

  return (
    <>
     {crumbs}
    </>
  );
};
