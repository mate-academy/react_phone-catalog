import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

import products from '../../api/products.json';
import { CombinedProduct } from '../../types/Product';

type RouteType = {
  label: string;
  path: string;
};

const routes: RouteType[] = [
  { label: 'Home', path: '' },
  { label: 'Phones', path: 'phones' },
  { label: 'Tablets', path: 'tablets' },
  { label: 'Accessories', path: 'accessories' },
  { label: 'Cart', path: 'cart' },
  { label: 'Favourites', path: 'favourites' },
  { label: 'Product Info', path: 'product-info' },
];

const BreadcrumbNavigation: React.FC = (): JSX.Element | null => {
  const { pathname } = useLocation();

  const currentRoutes = useMemo(() => {
    const extractRoutes = (input: string): string[] => {
      const path = input.replace(/^\/+|\/+$/g, '').replace(/\/\/+/g, '/');

      return path.split('/').filter(item => item);
    };

    return extractRoutes(pathname);
  }, [pathname]);

  if (pathname === '/') {
    return null;
  }

  const getProductByItemId = (itemId: string): CombinedProduct | undefined => {
    return products.find(product => product.itemId === itemId) as CombinedProduct | undefined;
  };

  return (
    <section className="breadcrumbs">
      <Link to="/" className="breadcrumbs-home">
        <img src="/img/icons/Home.png" alt="Home" className="breadcrumbs-home__img" />
      </Link>

      {currentRoutes.map((item, index) => {
        const isLastItem = index === currentRoutes.length - 1;
        const matchedRoute = routes.find(route => route.path === item);

        if (!matchedRoute) {
          // Обробка динамічних маршрутів
          const to = `/${currentRoutes.slice(0, index + 1).join('/')}`;
          const product = getProductByItemId(item);

          return (
            <section key={index} className="breadcrumbs__container">
              <img
                src="/img/icons/Chevron (Arrow Right).png"
                alt="Chevron"
                className="breadcrumbs__chevron"
              />
              {isLastItem ? (
                <h5 className="breadcrumbs__link-char">
                  {product ? product.name : item.replace(/-/g, ' ')}
                </h5>
              ) : (
                <Link to={to} className="breadcrumbs__link">
                  {product ? product.name : item.replace(/-/g, ' ')}
                </Link>
              )}
            </section>
          );
        }

        const to = `/${currentRoutes.slice(0, index + 1).join('/')}`;
        const capitalizedLabel =
          matchedRoute.label.charAt(0).toUpperCase() + matchedRoute.label.slice(1);

        return (
          <section key={index} className="breadcrumbs__container">
            <img
              src="/img/icons/Chevron (Arrow Right).png"
              alt="Chevron"
              className="breadcrumbs__chevron"
            />

            {isLastItem ? (
              <h5 className="breadcrumbs__link-char">{capitalizedLabel}</h5>
            ) : (
              <Link to={to} className="breadcrumbs__link">
                {capitalizedLabel}
              </Link>
            )}
          </section>
        );
      })}
    </section>
  );
};

export default BreadcrumbNavigation;
