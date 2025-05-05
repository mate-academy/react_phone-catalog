import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbsProps } from '@/types/Product';

export const Breadcrumbs = ({ currentName }: BreadcrumbsProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  let accumulatedPath = '';

  return (
    <div className="mt-6 px-4 sm:px-6 md:px-8 xl:px-[152px]">
      <div className="flex items-center gap-x-2 text-xs font-bold font-mont leading-[100%]">
        <Link to="/">
          <img src="icons/home.svg" alt="home" />
        </Link>

        {pathnames.map((name, index) => {
          accumulatedPath += `/${name}`;
          const isLast = index === pathnames.length - 1;

          return (
            <div className="flex items-center gap-x-2" key={accumulatedPath}>
              <img src="icons/arrow-right-dark.svg" alt="arrow-right" />
              {isLast ? (
                <span className="text-text-color-base-grey font-bold">
                  {currentName ||
                    decodeURIComponent(
                      name.charAt(0).toUpperCase() + name.slice(1),
                    )}
                </span>
              ) : (
                <Link
                  to={accumulatedPath}
                  className="hover:underline text-text-color-base-white text-xs"
                >
                  {decodeURIComponent(
                    name.charAt(0).toUpperCase() + name.slice(1),
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
