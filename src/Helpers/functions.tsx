import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from './Types/Product';

export const generateClassNames
  = (baseClass: string, modifiers: Record<string, boolean>) => {
    return classNames(baseClass, modifiers);
  };

export const filterFunction = (products: Product[], searchQuery: string) => {
  return products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
};

export const noResult = (products: Product[], searchQuery: string) => {
  return products.some(product => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
};

export const useProductPage = (
  getProducts: () => Promise<Product[]>,
  defaultSortingOption: string,
  defaultPerPage: number,
) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const initialSortingOption = searchParams.get('sort') || defaultSortingOption;
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialPerPage
    = parseInt(searchParams.get('perPage') || String(defaultPerPage), 10);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortingOption, setSortingOption]
    = useState<string>(initialSortingOption);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  const totalItems = products.length;

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPageValue = event.target.value;

    if (newPerPageValue === 'all') {
      setPerPage(products.length);
    } else {
      const newPerPage = parseInt(newPerPageValue, 10);

      setPerPage(newPerPage);
    }

    setCurrentPage(1);
  };

  const updateUrlWithSortingAndPagination = (
    newSortingOption: string,
    newPage: number,
    newPerPage: number,
  ) => {
    searchParams.set('sort', newSortingOption);
    searchParams.set('page', String(newPage));
    searchParams.set('perPage', String(newPerPage));
    navigate({ search: searchParams.toString() });
  };

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      setIsLoading(true);

      const productsData = await getProducts();

      switch (sortingOption) {
        case 'name':
          productsData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price':
          productsData.sort((a, b) => (a.price - ((a.price / 100) * a.discount))
            - (b.price - ((b.price / 100) * b.discount)));
          break;
        default:
          productsData.sort((a, b) => b.age - a.age);
          break;
      }

      return productsData;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateUrlWithSortingAndPagination(sortingOption, currentPage, perPage);

    fetchProducts().then(setProducts);
  }, [sortingOption, currentPage, perPage]);

  return {
    products,
    isLoading,
    sortingOption,
    currentPage,
    perPage,
    totalItems,
    handlePerPageChange,
    setSortingOption,
    setCurrentPage,
  };
};
