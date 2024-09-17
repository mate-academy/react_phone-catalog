import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cart } from '../../components/Cart';
import tabletsData from '../../api/tablets.json';
import { Loader } from '../../components/Loader';
import './TabletsPage.scss';
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

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
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
    setIsLoading(true);

    const fetchData = () => {
      return new Promise<Product[]>((resolve) => {
        setTimeout(() => {
          resolve(transformData(tabletsData));
        }, 1000);
      });
    };

    fetchData()
      .then((data) => {
        setTablets(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

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
  if (tablets.length > 0) {
    setIsShow(true);
  }
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

  if (tablets.length > 0) {
    setIsShow(true);
  }

  return (
    <div className="tablets container">
      <BackButton title="Tablets" />
      <h2 className="tablets__title">Tablets</h2>
      <p className="tablets__subtitle">
        {tablets.length > 0
          ? `${tablets.length} items`
          : 'No tablets available'}
      </p>

      <div className="tablets__sort">
        <CustomSelect onSortChange={handleSortChange} />
        <CustomSelectPage
          onItemsPerPageChange={handleItemsPerPageChange}
          currentItemsPerPage={
            itemsPerPage === tablets.length ? 'all' : itemsPerPage.toString()
          }
          />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="tablets__wrapper">
          {tablets.length === 0 ? (
            <div className="tablets__no-items">There are no tablets</div>
          ) : currentTablets.length > 0 ? (
            currentTablets.map((product) => (
              <Cart key={product.id} product={product} showDiscount={true} />
            ))
          ) : (
            <EmptyPage />
          )}
        </div>
      )}

      {itemsPerPage !== tablets.length && !isLoading && (
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};