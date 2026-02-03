import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import React from 'react';

interface CatalogueOptionsProps {
  totalProducts?: number;
}

const TITLE_LABELS: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favourites',
  cart: 'Cart',
};

const PathCategory = ({ totalProducts }: CatalogueOptionsProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split('/').filter(segment => segment);

  const isCart = pathSegments[0] === 'cart';
  const isFavorites = pathSegments[0] === 'favorites';
  const isProductPage = pathSegments.length >= 2 && !isCart && !isFavorites;

  const showModelsCount =
    ((pathSegments.length === 1 && !isCart && !isFavorites) || isFavorites) &&
    totalProducts !== undefined;

  const showBackButton = isCart || isFavorites || isProductPage;
  const showBreadcrumbs = !isCart && !isFavorites;

  const breadcrumbs = pathSegments.map((segment, index) => {
    const to = '/' + pathSegments.slice(0, index + 1).join('/');

    let label = decodeURIComponent(segment);

    label = label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, ' ');

    return { to, label, rawSegment: segment.toLowerCase() };
  });

  const lastSegment = breadcrumbs[breadcrumbs.length - 1];
  const h1Title = lastSegment
    ? TITLE_LABELS[lastSegment.rawSegment] || lastSegment.label
    : '';

  const handleBack = () => {
    if (isProductPage) {
      const categoryPath = `/${pathSegments[0]}`;

      navigate(categoryPath);
    } else {
      navigate(-1);
    }
  };

  const HomeIcon = (
    <Link to="/" className={styles.homeLink}>
      <img src="./../..//public/img/icons/Home.svg" alt="Home" />
    </Link>
  );

  const Separator = (
    <img
      src="./../..//public/img/icons/Arrow_Right(Gray).svg"
      alt="Arrow_Right"
    />
  );

  return (
    <div className="full_width">
      {showBreadcrumbs && (
        <div className={styles.icons}>
          {HomeIcon}
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.to}>
              {Separator}
              {index === breadcrumbs.length - 1 ? (
                <span className={`text_small ${styles.currentPath}`}>
                  {breadcrumb.label}
                </span>
              ) : (
                <Link to={breadcrumb.to} className="text_small">
                  {breadcrumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {showBackButton && (
        <button className={styles.icons_back} onClick={handleBack}>
          <img src="/img/icons/Arrow_Left.svg" alt="Back" />
          <span className="text_small">Back</span>
        </button>
      )}

      {h1Title && (
        <div className={styles.icons_label}>
          {pathSegments.length >= 2 ? <h2>{h1Title}</h2> : <h1>{h1Title}</h1>}
          {showModelsCount && (
            <span className="text_small">
              {totalProducts} {isFavorites ? 'items' : 'models'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PathCategory;
