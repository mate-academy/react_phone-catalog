import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductTypes';
import { fetchAllProducts } from '../../utils/api';
interface DropDownOption {
  value: string;
}
export const useProductHooks = () => {
  // const [phones, setPhones] = useState<Product[]>([]);
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [itemPrevPage, setItemPrevPage] = useState(8); //початкове відображення карток
  const [currentPage, setCurrentPage] = useState(1); // початкова сторінка
  const [sortBy, setSortBy] = useState('Newest'); // початкове сортування
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sortParam = searchParams.get('sort');

    if (sortParam) {
      setSortBy(sortParam);
    }
  }, [searchParams]);

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
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [sortBy]);

  //функція для сортування
  const hanleSortChange = (option: DropDownOption) => {
    const sortOption = option.value;

    setSortBy(sortOption);
    setSearchParams({ sort: sortOption });

    const sortedPhone = [...phones];

    if (sortBy === 'Newest') {
      sortedPhone.sort((a, b) => b.year - a.year);
    }

    if (sortBy === 'Alphabetically') {
      sortedPhone.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'Cheapest') {
      sortedPhone.sort((a, b) => a.priceRegular - b.priceRegular);
    }

    setPhones(sortedPhone);
  };

  const handleItemsChange = (option: DropDownOption) => {
    const value = parseInt(option.value, 10);

    if (isNaN(value)) {
      setItemPrevPage(phones.length);
      setSearchParams({ itemPrevPage: 'All' });
    } else {
      setItemPrevPage(value);
      setSearchParams({ itemPrevPage: option.value });
    }

    setCurrentPage(1);
    // setCurrentPage(1);
    setSearchParams({ itemPrevPage: option.value });
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
    handleItemsChange,
    hanleSortChange,
    setItemPrevPage,
  };
};
