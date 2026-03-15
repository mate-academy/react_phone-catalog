import { useMemo } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { ContextProps } from '../../../../types/ContextProps';

export const useBreadcrumbs = () => {
  const { pathname } = useLocation();
  const { products } = useOutletContext<ContextProps>();

  const breadcrumbs = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    const result: { name: string; path: string }[] = [];

    if (parts[0] === 'product' && parts[1]) {
      const product = products.find(p => p.itemId === parts[1]);

      if (product) {
        result.push({
          name:
            product.category.charAt(0).toUpperCase() +
            product.category.slice(1),
          path: `/${product.category}`,
        });
        result.push({
          name: product.name,
          path: pathname,
        });
      }
    } else {
      parts.forEach((part, index) => {
        const path = `/${parts.slice(0, index + 1).join('/')}`;

        result.push({
          name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
          path,
        });
      });
    }

    return result;
  }, [pathname, products]);

  return {
    breadcrumbs,
    isHome: pathname === '/',
  };
};
