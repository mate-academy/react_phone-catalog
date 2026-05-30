import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import type { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { useTranslation } from 'react-i18next';
import './styles/main.scss';

import { Header, Menu, Footer, Breadcrumbs, Icon } from './modules/shared';
import type { BreadcrumbItem } from './modules/shared';

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Define routes with custom breadcrumb names
  const routes = React.useMemo(
    () => [
      {
        path: '/',
        breadcrumb: () => <Icon name="home" size={16} />,
      },
      {
        path: '/:category',
        breadcrumb: ({ match }: BreadcrumbComponentProps<'category'>) => {
          const category = match.params.category;

          switch (category) {
            case 'phones':
              return t('breadcrumbs.phones');
            case 'tablets':
              return t('breadcrumbs.tablets');
            case 'accessories':
              return t('breadcrumbs.accessories');
            default:
              return category;
          }
        },
      },
      { path: '/favorites', breadcrumb: t('breadcrumbs.favorites') },
      {
        path: '/:category/:product',
        breadcrumb: ({ match }: BreadcrumbComponentProps<'product'>) => {
          // product slug is in match.params.product
          const productSlug = match.params.product;

          // Default fallback: transform slug to title case
          return (
            productSlug
              ?.replace(/-/g, ' ')
              .replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Product'
          );
        },
      },
    ],
    [t],
  );

  const breadcrumbs = useBreadcrumbs(routes);

  // Handler for breadcrumb clicks
  const handleBreadcrumbClick = (pathname: string) => {
    navigate(pathname);
  };

  // Convert breadcrumbs to our format
  const formattedBreadcrumbs: BreadcrumbItem[] = breadcrumbs.map(
    ({ key, match, breadcrumb, location: crumbLocation }) => ({
      key,
      match: {
        pathname: match.pathname,
        params: match.params as Record<string, string | undefined>,
      },
      breadcrumb,
      location: {
        pathname: crumbLocation.pathname,
      },
    }),
  );

  // Don't show breadcrumbs on home page and cart page
  const shouldShowBreadcrumbs =
    location.pathname !== '/' && location.pathname !== '/cart';

  return (
    <div className="App page">
      <h1 className="visually-hidden">Product Catalog</h1>
      <Header />
      <Menu />

      <main className="main page__main">
        {shouldShowBreadcrumbs && (
          <div className="page__breadcrumbs">
            <Breadcrumbs
              breadcrumbs={formattedBreadcrumbs}
              onBreadcrumbClick={handleBreadcrumbClick}
            />
          </div>
        )}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
