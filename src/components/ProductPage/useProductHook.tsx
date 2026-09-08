import { useEffect, useMemo, useState } from 'react';
import {
  ItemsPerPageOption,
  Product,
  ProductDetails,
  SortOption,
} from '../../types/ProductTypes';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchAllProducts, fetchProducts } from '../../utils/api';

export const useProductHook = () => {
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [itemPrevPage, setItemPrevPage] = useState<ItemsPerPageOption>(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Newest');
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line
  const [cart, setCart] = useState<ProductDetails[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const path = useLocation();
  const currentCategory = path.pathname.slice(1);

  useEffect(() => {
    const sortParam = searchParams.get('sort') as SortOption | null;
    const pageParam = searchParams.get('page');
    const itemsPrevPageParam = searchParams.get('itemsPerPage');

    if (sortParam) {
      setSortBy(sortParam);
    }

    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }

    if (itemsPrevPageParam === 'all') {
      setItemPrevPage('all');
    } else if (itemsPrevPageParam) {
      setItemPrevPage(Number(itemsPrevPageParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAllProducts()
        .then(data => {
          setPhones(data.filter(d => d.category === 'phones'));
          setError(null);
        })
        .catch(() => {
          setError('Something went wrong...');
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        const validCategories = ['phones', 'tablets', 'accessories'];

        if (validCategories.includes(currentCategory)) {
          const filteredProducts = data.filter(
            (product: ProductDetails) => product.category === currentCategory,
          );

          setProducts(filteredProducts);
        } else {
          setProducts([]);
        }
      } catch {
        setError('Something went wrong...');
      }
    };

    fetchData();

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart(savedCart);
  }, [currentCategory, setError]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const priceA = a.fullPrice ?? 0;
      const priceB = b.fullPrice ?? 0;
      const yearA = a.year ?? 0;
      const yearB = b.year ?? 0;

      if (sortBy === 'Cheapest') {
        return priceA - priceB;
      }

      if (sortBy === 'Newest') {
        return yearB - yearA;
      }

      if (sortBy === 'Alphabetically') {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });
  }, [products, sortBy]);

  const itemsPerPage =
    itemPrevPage === 'all' ? sortedProducts.length : itemPrevPage;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleSortChange = (option: SortOption) => {
    const normalized = (option.charAt(0).toUpperCase() +
      option.slice(1).toLowerCase()) as SortOption;

    setSortBy(normalized);
    setSearchParams({
      sort: normalized,
      page: '1',
      itemsPerPage: String(itemPrevPage),
    });
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({
      sort: sortBy,
      page: String(newPage),
      itemsPerPage: String(itemPrevPage),
    });
  };

  const handleItemsPerPageChange = (newItemsPerPage: ItemsPerPageOption) => {
    setItemPrevPage(newItemsPerPage);
    setSearchParams({
      sort: sortBy,
      page: '1',
      itemsPerPage: String(newItemsPerPage),
    });
    setCurrentPage(1);
  };

  return {
    phones,
    loading,
    error,
    currentItems,
    currentPage,
    currentCategory,
    totalPages,
    setError,
    setCurrentPage,
    handleSortChange,
    setItemPrevPage,
    itemPrevPage,
    sortBy,
    products,
    handleItemsPerPageChange,
    handlePageChange,
  };
};
