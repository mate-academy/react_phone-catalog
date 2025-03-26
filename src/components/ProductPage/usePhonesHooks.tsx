import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product, ProductDetails } from '../../types/ProductTypes';
import { fetchAllProducts, fetchProducts } from '../../utils/api';

export const useProductHooks = () => {
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [itemPrevPage, setItemPrevPage] = useState(8); //початкове відображення карток
  const [currentPage, setCurrentPage] = useState(1); // початкова сторінка
  const [sortBy, setSortBy] = useState('Newest'); // початкове сортування
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<ProductDetails[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const path = useLocation();
  const currentCategory = path.pathname.slice(1);

  useEffect(() => {
    const sortParam = searchParams.get('sort');

    if (sortParam) {
      setSortBy(sortParam);
    }
  }, [searchParams]);

  // отримує лише для телефонів дані
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAllProducts()
        .then(data => {
          setPhones(data.filter(dat => dat.category === 'phones'));
          setError(null);
        })
        .catch(() => {
          setError(
            'Oops, something went wrong, please check your connection😽',
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  //завантажує товари з API і фільтрує за катергоріями
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
        setError(
          `Oops, something went wrong, please check your connection 🫶💻`,
        );
      }
    };

    fetchData();

    // завантажує cart з localstorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart(savedCart);
  }, [currentCategory, setError]);

  //функція для сортування
  const handleSortChange = (option: string) => {
    setSortBy(option);
    setSearchParams({ sort: option });
  };

  const indexOfLastItem = currentPage * itemPrevPage;

  const indexOfFirstItem = indexOfLastItem - itemPrevPage;
  const currentItems = phones.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(phones.length / itemPrevPage);

  return {
    phones,
    loading,
    error,
    currentItems,
    currentPage,
    totalPages,
    setError,
    setCurrentPage,
    // handleItemsChange,
    handleSortChange,
    setItemPrevPage,
    itemPrevPage,
    sortBy,
    products,
    currentCategory,
  };
};
