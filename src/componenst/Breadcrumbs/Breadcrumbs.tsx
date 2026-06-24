import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const base = import.meta.env.BASE_URL ?? '/';
const resolveUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`;
};

const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const prevPageFromStorage = sessionStorage.getItem('prevPage') || '/';
  const productNameFromStorage = sessionStorage.getItem('productName') || '';

  // On cart page, show Back button instead of breadcrumbs
  if (pathname === '/cart') {
    return (
      <nav className={styles.breadcrumbs}>
        <ol className={styles.list}>
          <li className={styles.item}>
            <Link to={prevPageFromStorage} className={styles.backButton}>
              <img
                src={resolveUrl('icons/Chevron (Arrow Right).svg')}
                alt=""
                className={styles.backArrow}
              />
              <span>Back</span>
            </Link>
          </li>
        </ol>
      </nav>
    );
  }

  // Map paths to breadcrumb items
  const getBreadcrumbs = (path: string): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];
    const segments = path.split('/').filter(Boolean);

    if (segments.length === 0) {
      return [];
    }

    // Handle /products/:category (phones, tablets, accessories)
    if (segments[0] === 'products' && segments[1]) {
      const label = segments[1].charAt(0).toUpperCase() + segments[1].slice(1);

      crumbs.push({ label, path: `/products/${segments[1]}` });
    }

    // Handle /product/:category/:id (product detail)
    if (segments[0] === 'product' && segments.length >= 3) {
      const category =
        segments[1].charAt(0).toUpperCase() + segments[1].slice(1);

      crumbs.push({ label: category, path: `/products/${segments[1]}` });
      crumbs.push({
        label: productNameFromStorage || segments[2],
        path: pathname,
      });
    }

    // Handle /favourites
    if (segments[0] === 'favourites') {
      crumbs.push({ label: 'Favourites', path: '/favourites' });
    }

    // Handle 404
    if (
      segments[0] === '404' ||
      (segments.length > 0 &&
        !['products', 'product', 'favourites', 'cart'].includes(segments[0]))
    ) {
      crumbs.push({ label: 'Not Found', path: pathname });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs(pathname);

  // Don't show breadcrumbs on home or cart
  if (pathname === '/' || pathname === '/cart' || breadcrumbs.length === 0) {
    return null;
  }

  // Check if we're on ProductDetails page
  const isProductDetails = pathname.startsWith('/product/');

  // Only show Back button if prevPage exists AND it's different from current pathname
  // (to avoid showing Back after page reload or direct link access)
  const hasValidPrevPage =
    sessionStorage.getItem('prevPage') &&
    sessionStorage.getItem('prevPage') !== pathname;

  return (
    <>
      <nav className={styles.breadcrumbs}>
        <ol className={styles.list}>
          {breadcrumbs.map((item, index) => (
            <li key={item.path} className={styles.item}>
              {index === 0 ? (
                // Home icon as first item
                <Link to={item.path} className={styles.homeLink}>
                  <img
                    src={resolveUrl('icons/Home.svg')}
                    alt="Home"
                    className={styles.homeIcon}
                  />
                </Link>
              ) : index === breadcrumbs.length - 1 ? (
                // Current page (no link)
                <span className={styles.current}>{item.label}</span>
              ) : (
                // Middle items (clickable links)
                <Link to={item.path} className={styles.link}>
                  {item.label}
                </Link>
              )}

              {index < breadcrumbs.length - 1 && (
                <img
                  src={resolveUrl('icons/Chevron (Arrow Right).svg')}
                  alt="separator"
                  className={styles.separator}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
      {isProductDetails && hasValidPrevPage && (
        <div className={styles.backContainer}>
          <Link to={prevPageFromStorage} className={styles.backButton}>
            <img
              src={resolveUrl('icons/Chevron (Arrow Right).svg')}
              alt=""
              className={styles.backArrow}
            />
            <span>Back</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default Breadcrumbs;
