import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cart } from '../../components/Cart';
import tabletsData from '../../api/tablets.json';
import './TabletsPage.scss';
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

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>(transformData(tabletsData));
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
      perPageParam === 'all' ? tablets.length : parseInt(perPageParam, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(pageParam);
    setSortType(initialSortType);
  }, [location.search, tablets.length]);

  useEffect(() => {
    sortTablets(sortType);
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
    sortTablets(selectedSortType);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    const newItemsPerPage =
      value === 'all' ? tablets.length : parseInt(value, 10);
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

  const sortTablets = (type: string) => {
    const sortedTablets = [...tablets];

    if (type === 'latest') {
      sortedTablets.sort((a, b) => {
        const versionA = extractVersionNumber(a.name);
        const versionB = extractVersionNumber(b.name);
        return versionA - versionB;
      });
    } else if (type === 'newest') {
      sortedTablets.sort((a, b) => {
        const versionA = extractVersionNumber(a.name);
        const versionB = extractVersionNumber(b.name);
        return versionB - versionA;
      });
    }

    setTablets(sortedTablets);
  };

  const indexOfLastTablet =
    currentPage * (itemsPerPage === 'all' ? tablets.length : itemsPerPage);
  const indexOfFirstTablet =
    indexOfLastTablet -
    (itemsPerPage === 'all' ? tablets.length : itemsPerPage);
  const currentTablets = tablets.slice(indexOfFirstTablet, indexOfLastTablet);

  const totalPages =
    itemsPerPage === tablets.length
      ? 1
      : Math.ceil(
          tablets.length /
            (itemsPerPage === 'all' ? tablets.length : itemsPerPage),
        );

  return (
    <div className="tablets container">
      <BackButton title="Tablets" />
      <h2 className="tablets__title">Tablets</h2>
      <p className="tablets__subtitle">{tablets.length} items</p>
      <div className="tablets__sort">
        <div className="tablets__sort--model">
          <p className="tablets__subtitle">Sort By</p>
          <select
            className="tablets__sort--options"
            aria-label="Sort tablets by"
            value={sortType.toLowerCase()}
            onChange={handleSortChange}
          >
            <option className="tablets__sort--option" value="newest">
              Newest
            </option>
            <option className="tablets__sort--option" value="latest">
              Latest
            </option>
          </select>
        </div>
        <div className="tablets__sort--page">
          <p className="tablets__subtitle">Items on page</p>
          <select
            className="tablets__sort--page-options"
            aria-label="Items on page"
            value={
              itemsPerPage === tablets.length ? 'all' : itemsPerPage.toString()
            }
            onChange={handleItemsPerPageChange}
          >
            <option value="4" className="tablets__sort--option">
              4
            </option>
            <option value="8" className="tablets__sort--option">
              8
            </option>
            <option value="16" className="tablets__sort--option">
              16
            </option>
            <option value="all" className="tablets__sort--option">
              all
            </option>
          </select>
        </div>
      </div>

      <div className="tablets__wrapper">
        {currentTablets.length > 0 ? (
          currentTablets.map((product) => (
            <Cart key={product.id} product={product} showDiscount={true} />
          ))
        ) : (
          <div>
            <EmptyPage />
          </div>
        )}
      </div>

      {itemsPerPage !== tablets.length && (
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
