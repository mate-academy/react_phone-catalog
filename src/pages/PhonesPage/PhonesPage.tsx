import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cart } from '../../components/Cart';
import { Loader } from '../../components/Loader';
import phonesData from '../../api/api/phones.json';
import './PhonesPage.scss';
import { Product } from '../../types';
import { BackButton } from '../../components/BackButton';
import { PaginationPage } from '../PaginationPage';
import { EmptyPage } from '../EmptyPage';
import { useLoader } from '../../context/LoaderContext';
import { useFooter } from '../../context/FooterContext';
import { CustomSelect } from '../../components/CustomSelect';
import { CustomSelectPage } from '../../components/CustomSelectPage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformData = (data: any[]): Product[] => {
  return data.map((item) => ({
    ...item,
    capacity: Array.isArray(item.capacity) ? item.capacity : [item.capacity],
    color: Array.isArray(item.color) ? item.color : [item.color],
  }));
};

const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(transformData(phonesData)), 1000);
  });
};

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>('all');
  const [sortType, setSortType] = useState<string>('newest');
  const { isLoading, setIsLoading } = useLoader();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSortType = params.get('sort') === 'latest' ? 'latest' : 'newest';
  const perPageParam = params.get('perPage') || 'all';
  const pageParam = parseInt(params.get('page') || '1', 10);

  const { setIsShow } = useFooter();
  useEffect(() => {
    const newItemsPerPage =
      perPageParam === 'all' ? phones.length : parseInt(perPageParam, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(pageParam);
    setSortType(initialSortType);
  }, [location.search, phones.length]);

  useEffect(() => {
    sortPhones(sortType);
  }, [sortType]);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts()
      .then((data) => setPhones(data))
      .finally(() => setIsLoading(false));
  }, []);

  const updateUrlParams = (newParams: URLSearchParams) => {
    navigate(`?${newParams.toString()}`);
  };

  const handleSortChange = (selectedSortType: string) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('sort', selectedSortType);
    updateUrlParams(newParams);
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage =
      value === 'all' ? phones.length : parseInt(value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    const newParams = new URLSearchParams(location.search);
    newParams.set('perPage', value);
    newParams.set('page', '1');
    updateUrlParams(newParams);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', page.toString());
    updateUrlParams(newParams);
  };

  const extractVersionNumber = (name: string): number => {
    const match = name.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const sortPhones = (type: string) => {
    const sortedPhones = [...phones];

    if (type === 'latest') {
      sortedPhones.sort((a, b) => {
        const versionA = extractVersionNumber(a.name);
        const versionB = extractVersionNumber(b.name);
        return versionA - versionB;
      });
    } else if (type === 'newest') {
      sortedPhones.sort((a, b) => {
        const versionA = extractVersionNumber(a.name);
        const versionB = extractVersionNumber(b.name);
        return versionB - versionA;
      });
    }

    setPhones(sortedPhones);
  };

  const indexOfLastPhone =
    currentPage * (itemsPerPage === 'all' ? phones.length : itemsPerPage);
  const indexOfFirstPhone =
    indexOfLastPhone - (itemsPerPage === 'all' ? phones.length : itemsPerPage);
  const currentPhones = phones.slice(indexOfFirstPhone, indexOfLastPhone);

  const totalPages =
    itemsPerPage === phones.length
      ? 1
      : Math.ceil(
          phones.length /
            (itemsPerPage === 'all' ? phones.length : itemsPerPage),
        );

  if (phones.length > 0) {
    setIsShow(true);
  }

  return (
    <div className="phones container">
      <BackButton title="Phones" />
      <h2 className="phones__title">Mobile Phones</h2>
      <p className="phones__subtitle">
        {phones.length > 0 ? `${phones.length} items` : 'No phones available'}
      </p>

      <div className="phones__sort">
        <CustomSelect onSortChange={handleSortChange} />
        <CustomSelectPage
          onItemsPerPageChange={handleItemsPerPageChange}
          currentItemsPerPage={
            itemsPerPage === phones.length ? 'all' : itemsPerPage.toString()
          }
        />
      </div>

      <div className="phones__wrapper">
        {isLoading ? (
          <Loader />
        ) : phones.length === 0 ? (
          <div className="phones__no-items">There are no phones</div>
        ) : currentPhones.length > 0 ? (
          currentPhones.map((product) => (
            <Cart key={product.id} product={product} showDiscount={true} />
          ))
        ) : (
          <EmptyPage />
        )}
      </div>

      {itemsPerPage !== phones.length && (
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
