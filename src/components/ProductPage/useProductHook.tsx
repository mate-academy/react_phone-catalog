import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product, ProductDetails } from '../../types/ProductTipes';
import { fetchAllProducts, fetchProducts } from '../../utils/api';

export const useProductHook = () => {
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [itemPrevPage, setItemPrevPage] = useState(8);
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
    const sortParam = searchParams.get('sort');
    const pageParam = searchParams.get('page');
    const itemsPerPageParam = searchParams.get('itemsPerPage');

    if (sortParam) {
      setSortBy(sortParam);
    }

    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }

    if (itemsPerPageParam) {
      setItemPrevPage(Number(itemsPerPageParam));
    }
    // eslint-disable-next-line
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
          const filteredProducts = data.filter(
            (product: Product) => product.category === currentCategory,
          );

          setProducts(filteredProducts);
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

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'Newest') {
      return b.year - a.year;
    }

    if (sortBy === 'Alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'Cheapest') {
      return a.fullPrice - b.fullPrice;
    }

    return a.name.localeCompare(b.name);
  });

  const startIndex = (currentPage - 1) * itemPrevPage;
  const endIndex = startIndex + itemPrevPage;
  const currentItems = sortedProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedProducts.length / itemPrevPage);

  const handleSortChange = (option: string) => {
    setSortBy(option);
    setSearchParams({
      sort: option,
      page: '1',
      itemsPerPage: String(itemPrevPage),
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({
      sort: sortBy,
      page: String(newPage),
      itemsPerPage: String(itemPrevPage),
    });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemPrevPage(newItemsPerPage);
    setSearchParams({
      sort: sortBy,
      page: '1',
      itemsPerPage: String(newItemsPerPage),
    });
  };

  return {
    phones,
    loading,
    error,
    currentItems,
    currentPage,
    totalPages,
    setError,
    setCurrentPage,
    handleSortChange,
    setItemPrevPage,
    itemPrevPage,
    sortBy,
    products,
    currentCategory,
    handleItemsPerPageChange,
    handlePageChange,
  };
};
