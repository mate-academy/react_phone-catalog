import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cart } from '../../components/Cart';
import accessoriesData from '../../api/accessories.json';
import './Accessories.scss';
import { Phone } from '../../types';
import { BackButton } from '../../components/BackButton';
import { PaginationPage } from '../PaginationPage';
import { EmptyPage } from '../EmptyPage';

const transformData = (data: any[]): Phone[] => {
  return data.map((item) => ({
    ...item,
    capacity: Array.isArray(item.capacity) ? item.capacity : [item.capacity],
    color: Array.isArray(item.color) ? item.color : [item.color],
  }));
};

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Phone[]>(transformData(accessoriesData));
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
      perPageParam === 'all' ? accessories.length : parseInt(perPageParam, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(pageParam);
    setSortType(initialSortType);
  }, [location.search, accessories.length]);

  useEffect(() => {
    sortAccessories(sortType);
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
    sortAccessories(selectedSortType);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    const newItemsPerPage =
      value === 'all' ? accessories.length : parseInt(value, 10);
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


  const sortAccessories = (type: string) => {
    const sortedAccessories = [...accessories];

    if (type === 'latest') {
      sortedAccessories.sort((a, b) => {
        const versionA = extractVersionNumber(a.name);
        const versionB = extractVersionNumber(b.name);
        return versionA - versionB;
      });
    } else if (type === 'newest') {
      sortedAccessories.sort((a, b) => {
        const versionA = extractVersionNumber(a.name);
        const versionB = extractVersionNumber(b.name);
        return versionB - versionA;
      });
    }

    setAccessories(sortedAccessories);
  };

  const indexOfLastAccessory =
    currentPage * (itemsPerPage === 'all' ? accessories.length : itemsPerPage);
  const indexOfFirstAccessory =
    indexOfLastAccessory - (itemsPerPage === 'all' ? accessories.length : itemsPerPage);
  const currentAccessories = accessories.slice(indexOfFirstAccessory, indexOfLastAccessory);

  const totalPages =
    itemsPerPage === accessories.length
      ? 1
      : Math.ceil(
          accessories.length /
            (itemsPerPage === 'all' ? accessories.length : itemsPerPage),
        );

  return (
    <div className="accessories container">
      <BackButton title="Accessories" />
      <h2 className="accessories__title">Accessories</h2>
      <p className="accessories__subtitle">{accessories.length} items</p>
      <div className="accessories__sort">
        <div className="accessories__sort--model">
          <p className="accessories__subtitle">Sort By</p>
          <select
            className="accessories__sort--options"
            aria-label="Sort accessories by"
            value={sortType.toLowerCase()}
            onChange={handleSortChange}
          >
            <option className="accessories__sort--option" value="newest">
              Newest
            </option>
            <option className="accessories__sort--option" value="latest">
              Latest
            </option>
          </select>
        </div>
        <div className="accessories__sort--page">
          <p className="accessories__subtitle">Items on page</p>
          <select
            className="accessories__sort--page-options"
            aria-label="Items on page"
            value={
              itemsPerPage === accessories.length ? 'all' : itemsPerPage.toString()
            }
            onChange={handleItemsPerPageChange}
          >
            <option value="4" className="accessories__sort--option">
              4
            </option>
            <option value="8" className="accessories__sort--option">
              8
            </option>
            <option value="16" className="accessories__sort--option">
              16
            </option>
            <option value="all" className="accessories__sort--option">
              all
            </option>
          </select>
        </div>
      </div>

      <div className="accessories__wrapper">
        {currentAccessories.length > 0 ? (
          currentAccessories.map((accessory) => (
            <Cart key={accessory.id} phone={accessory} showDiscount={true} />
          ))
        ) : (
          <div>
            <EmptyPage />
          </div>
        )}
      </div>

      {itemsPerPage !== accessories.length && (
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

