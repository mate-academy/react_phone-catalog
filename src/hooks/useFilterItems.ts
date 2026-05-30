import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { useSearchParams } from 'react-router-dom';

export const useFilterItems = (products: Product[]) => {
  const [productByCategory, setProductByCategory] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    const productCategory = [...products].filter(
      product => product.category === category,
    );

    setProductByCategory(productCategory);
  }, [searchParams, products]);

  const updateFilter = (filter: string) => {
    if (filter) {
      searchParams.set('filter', filter);
    } else if (filter === '') {
      searchParams.delete('filter');
    }

    setSearchParams(searchParams);
  };

  const updateQuantity = (number: string) => {
    if (number) {
      searchParams.set('quantity', number);
    } else if (number === '') {
      searchParams.delete('quantity');
    }

    setSearchParams(searchParams);
  };

  const getTitleName = () => {
    const category = searchParams.get('category');

    if (category === 'phones') {
      return 'Mobile phones';
    }

    if (category === 'tablets') {
      return 'Tablets';
    }

    if (category === 'accessories') {
      return 'Accessories';
    }

    return '';
  };

  const sortedProducts = [...productByCategory].sort((a, b) => {
    const filter = searchParams.get('filter');

    if (filter === 'price') {
      return b.price - a.price;
    }

    if (filter === 'name') {
      return a.name.localeCompare(b.name);
    }

    if (filter === 'newest') {
      return b.year - a.year;
    }

    return 0;
  });

  return {
    sortedProducts,
    updateFilter,
    updateQuantity,
    getTitleName,
  };
};
