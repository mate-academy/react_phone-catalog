import { useEffect, useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product, ProductDetails } from '../../types/ProductTipes';
import { fetchAllProducts, fetchProducts } from '../../utils/api';
import { SortOption, ItemsPerPageOption } from '../../types/ProductTipes';

export const useProductHook = () => {
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  //eslint-disable-next-line
  const [cart, setCart] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<SortOption>('Newest');
  const [itemPrevPage, setItemPrevPage] = useState<ItemsPerPageOption>(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const path = useLocation();
  const currentCategory = path.pathname.slice(1);

  useEffect(() => {
    const sortParam = searchParams.get('sort') as SortOption | null;
    const pageParam = searchParams.get('page');
    const itemsPerPageParam = searchParams.get('itemsPerPage');

    if (sortParam) {
      setSortBy(sortParam);
    }

    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }

    if (itemsPerPageParam === 'all') {
      setItemPrevPage('all');
    } else if (itemsPerPageParam) {
      setItemPrevPage(Number(itemsPerPageParam));
    }
    //eslint-disable-next-line
    console.log('Сортування запущено');
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAllProducts()
        .then(data => {
          setPhones(data.filter(d => d.category === 'phones'));
          setError(null);
        })
        .catch(() => {
          setError('Something went wrong... please, check your connection');
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        const validCategories = ['phones', 'tablets', 'accessories'];

        if (validCategories.includes(currentCategory)) {
          const filtered = data.filter(
            (p: ProductDetails) => p.category === currentCategory,
          );

          setProducts(filtered);
        } else {
          setProducts([]);
        }
      } catch {
        setError('Something went wrong... please, check your connection');
      }
    };

    fetchData();

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart(savedCart);
  }, [currentCategory]);

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
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedProducts.slice(startIndex, endIndex);

  //eslint-disable-next-line
  console.log('itemPrevPage:', itemPrevPage);

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setSearchParams({
      sort: option,
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
    products,
    currentItems,
    currentPage,
    totalPages,
    itemPrevPage,
    sortBy,
    currentCategory,
    loading,
    error,
    handleSortChange,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
