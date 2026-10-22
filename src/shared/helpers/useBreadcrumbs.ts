import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../../shared/context/ProductsContext';

export const useBreadcrumbs = () => {
  const location = useLocation();
  const { products } = useProducts();

  const parts = useMemo(
    () => location.pathname.split('/').filter(Boolean),
    [location.pathname],
  );

  return useMemo(() => {
    const first = parts[0];
    const second = parts[1];

    // Item page: /item/:itemId or /product/:itemId
    if ((first === 'item' || first === 'product') && second) {
      const currentItemId = second.toLowerCase();

      const product = products.find(
        item => item.itemId.toLowerCase() === currentItemId,
      );

      if (product) {
        const category = product.category;

        return [
          { label: 'Home', to: '/' },
          {
            label: category[0].toUpperCase() + category.slice(1),
            to: `/${category}`,
          },
          { label: product.name, to: undefined },
        ];
      }
    }

    // Category page: /phones, /tablets, /accessories
    if (parts.length === 1) {
      const category = parts[0];

      return [
        { label: 'Home', to: '/' },
        {
          label: category[0].toUpperCase() + category.slice(1),
          to: undefined,
        },
      ];
    }

    return [
      { label: 'Home', to: '/' },
      ...parts.map((part, index) => {
        const path = `/${parts.slice(0, index + 1).join('/')}`;

        return {
          label: part[0].toUpperCase() + part.slice(1),
          to: index === parts.length - 1 ? undefined : path,
        };
      }),
    ];
  }, [parts, products]);
};
