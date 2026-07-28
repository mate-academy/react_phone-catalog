import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Breadcrumbs } from '../Breadcrumbs';
import { Category, CATEGORIES } from '../../../../types';

export const Layout = () => {
  const location = useLocation();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const isHomePage = location.pathname === '/';

  // Generate breadcrumb links based on current route
  const getBreadcrumbLinks = () => {
    if (isHomePage) {
      return [];
    }

    const links: Array<{ to?: string; label: string }> = [];

    // For favourites page
    if (location.pathname === '/favourites') {
      links.push({ label: 'Favourites' });

      return links;
    }

    // For cart page
    if (location.pathname === '/cart') {
      links.push({ label: 'Cart' });

      return links;
    }

    // For category pages
    if (category && CATEGORIES.includes(category as Category)) {
      const categoryLabel =
        category === 'phones'
          ? 'Phones'
          : category === 'tablets'
            ? 'Tablets'
            : 'Accessories';

      links.push({ to: `/${category}`, label: categoryLabel });

      // For product details page
      if (productId) {
        links.push({ label: productId });
      }

      return links;
    }

    return links;
  };

  const breadcrumbLinks = getBreadcrumbLinks();

  return (
    <div className="app">
      <Header />

      <main className="main" data-cy="main-content">
        {!isHomePage && breadcrumbLinks.length > 0 && (
          <Breadcrumbs links={breadcrumbLinks} />
        )}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
