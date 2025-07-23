import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '../../images/icons/HomeIcon';
import { breadcrumbDictionary } from '../../i18n/breadcrumbDictionary';
import { useLanguage } from '../../context/language/useLanguage';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const Breadcrumbs = () => {
  const { currentLanguage } = useLanguage();
  const translations = breadcrumbDictionary[currentLanguage];

  const location = useLocation();
  const itemId = location.pathname.split('/')[2];

  const nameProduct = itemId
    ? itemId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : undefined;

  const getPathSegments = () => {
    const pathnames = location.pathname.split('/').filter(x => x);

    if (pathnames.length === 0) {
      return [];
    }

    const segments: BreadcrumbItem[] = [
      { label: translations.home, path: '/' },
    ];

    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;

      let label = segment.charAt(0).toUpperCase() + segment.slice(1);

      switch (segment) {
        case 'phones':
          label = translations.phones;
          break;
        case 'tablets':
          label = translations.tablets;
          break;
        case 'accessories':
          label = translations.accessories;
          break;
        case 'favourites':
          label = translations.favourites;
          break;
        case 'cart':
          label = translations.cart;
          break;
      }

      if (
        pathnames[index - 1] === 'phones' ||
        pathnames[index - 1] === 'tablets' ||
        pathnames[index - 1] === 'accessories'
      ) {
        label = nameProduct ?? label;
      }

      segments.push({
        label,
        path: index === pathnames.length - 1 ? undefined : currentPath,
      });
    });

    return segments;
  };

  const breadcrumbs = getPathSegments();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav
      className="flex items-center text-small my-6"
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div
          key={index}
          className="flex items-center"
        >
          {index === 0 ? (
            // Home icon
            <Link
              to="/"
              className="text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
            >
              <HomeIcon />
            </Link>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-secondary dark:text-dark-secondary mx-2"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {breadcrumb.path ? (
                <Link
                  to={breadcrumb.path}
                  className="text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="text-secondary dark:text-dark-secondary">
                  {breadcrumb.label}
                </span>
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
};
