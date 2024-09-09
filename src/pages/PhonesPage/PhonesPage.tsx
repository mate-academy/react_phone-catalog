import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cart } from '../../components/Cart';
import phonesData from '../../api/phones.json';
import './PhonesPage.scss';
import { Product } from '../../types';
import { BackButton } from '../../components/BackButton';
import { PaginationPage } from '../PaginationPage';
import { EmptyPage } from '../EmptyPage';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformData = (data: any[]): Product[] => {
  return data.map((item) => ({
    ...item,
    capacity: Array.isArray(item.capacity) ? item.capacity : [item.capacity],
    color: Array.isArray(item.color) ? item.color : [item.color],
  }));
};

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>(transformData(phonesData));
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>('all');
  const [sortType, setSortType] = useState<string>('newest');
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSortType = params.get('sort') === 'latest' ? 'latest' : 'newest';
  const perPageParam = params.get('perPage') || 'all';
  const pageParam = parseInt(params.get('page') || '1', 10);

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

  const updateUrlParams = (newParams: URLSearchParams) => {
    navigate(`?${newParams.toString()}`);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortType = event.target.value;
    setSortType(selectedSortType);
    const newParams = new URLSearchParams(location.search);
    newParams.set(
      'sort',
      selectedSortType.charAt(0).toUpperCase() + selectedSortType.slice(1),
    );
    updateUrlParams(newParams);
    sortPhones(selectedSortType);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
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
    const match = name.match(/iPhone (\d+)/);
    return match ? parseInt(match[1], 10) : 0;
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

  return (
    <div className="phones container">
      <BackButton title="Phones" />
      <h2 className="phones__title">Mobile Phones</h2>
      <p className="phones__subtitle">{phones.length} items</p>
      <div className="phones__sort">
        <div className="phones__sort--model">
          <p className="phones__subtitle">Sort By</p>
          <select
            className="phones__sort--options"
            aria-label="Sort phones by"
            value={sortType.toLowerCase()}
            onChange={handleSortChange}
          >
            <option className="phones__sort--option" value="newest">
              Newest
            </option>
            <option className="phones__sort--option" value="latest">
              Latest
            </option>
          </select>
        </div>
        <div className="phones__sort--page">
          <p className="phones__subtitle">Items on page</p>
          <select
            className="phones__sort--page-options"
            aria-label="Items on page"
            value={
              itemsPerPage === phones.length ? 'all' : itemsPerPage.toString()
            }
            onChange={handleItemsPerPageChange}
          >
            <option value="4" className="phones__sort--option">
              4
            </option>
            <option value="8" className="phones__sort--option">
              8
            </option>
            <option value="16" className="phones__sort--option">
              16
            </option>
            <option value="all" className="phones__sort--option">
              all
            </option>
          </select>
        </div>
      </div>

      <div className="phones__wrapper">
        {currentPhones.length > 0 ? (
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
