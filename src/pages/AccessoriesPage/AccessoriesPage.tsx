import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cart } from '../../components/Cart';
import accessoriesData from '../../api/accessories.json';
import './Accessories.scss';
import { Product } from '../../types';
import { BackButton } from '../../components/BackButton';
import { PaginationPage } from '../PaginationPage';
import { EmptyPage } from '../EmptyPage';
import { Loader } from '../../components/Loader';
import { useLoader } from '../../context/LoaderContext';
import { useFooter } from '../../context/FooterContext';
import { CustomSelect } from '../../components/CustomSelect';
import { CustomSelectPage } from '../../components/CustomSelectPage';
import { NotFound } from '../../components/NotFound';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformData = (data: any[]): Product[] => {
  return data.map((item) => ({
    ...item,
    capacity: Array.isArray(item.capacity) ? item.capacity : [item.capacity],
    color: Array.isArray(item.color) ? item.color : [item.color],
  }));
};

const cleanId = (id: string) => {
  return id.replace(/_/g, '');
};

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>('all');
  const [sortType, setSortType] = useState<string>('newest');
  const { isLoading, setIsLoading } = useLoader();
  const { setIsShow } = useFooter();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialSortType = params.get('sort') === 'latest' ? 'latest' : 'newest';
  const perPageParam = params.get('perPage') || 'all';
  const pageParam = params.get('page') || '1';

  useEffect(() => {
    setIsLoading(true); 
    
    const fetchData = () => {
      setTimeout(() => {
        const data = transformData(accessoriesData || []);
        setAccessories(data);

        setIsLoading(false); 
      }, 1000);
     
    };
  
    fetchData();
  }, []);
  
  
  useEffect(() => {
    const newItemsPerPage =
      perPageParam === 'all' ? accessories.length : parseInt(perPageParam, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(parseInt(cleanId(pageParam), 10));
    setSortType(initialSortType);
  }, [perPageParam, pageParam, initialSortType, accessories.length]);

  useEffect(() => {
    if (!isLoading) sortAccessories(sortType);
  }, [sortType, isLoading]);

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
      value === 'all' ? accessories.length : parseInt(value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    const newParams = new URLSearchParams(location.search);
    newParams.set('perPage', value);
    newParams.set('page', '1');
    updateUrlParams(newParams);
  };
  const handlePageChange = (page: number) => {
    const cleanedPage = cleanId(page.toString());
    setCurrentPage(page);
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', cleanedPage);
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
    indexOfLastAccessory -
    (itemsPerPage === 'all' ? accessories.length : itemsPerPage);
  const currentAccessories = accessories.slice(
    indexOfFirstAccessory,
    indexOfLastAccessory,
  );

  const totalPages =
    itemsPerPage === accessories.length
      ? 1
      : Math.ceil(
          accessories.length /
            (itemsPerPage === 'all' ? accessories.length : itemsPerPage),
        );

  if (accessories.length > 0) {
    setIsShow(true);
  }

  return (
    <div className="accessories container">
      <BackButton title="Accessories" />
      <h2 className="accessories__title">Accessories</h2>
      <p className="accessories__subtitle">
        {accessories.length > 0
          ? `${accessories.length} items`
          : 'No accessories available'}
      </p>

      <div className="accessories__sort">
        <CustomSelect onSortChange={handleSortChange} />
        <CustomSelectPage
          onItemsPerPageChange={handleItemsPerPageChange}
          currentItemsPerPage={
            itemsPerPage === accessories.length
              ? 'all'
              : itemsPerPage.toString()
          }
        />
      </div>

      {isLoading ?(
        <Loader />
      ) : (
        <div className="accessories__wrapper">
          {accessories.length === 0 ? (
            <div className="accessories__no-items">
               <p>There are no accessories</p> 
               <NotFound />
              </div>
          ) : currentAccessories.length > 0 ? (
            currentAccessories.map((product) => (
              <Cart key={product.id} product={product} showDiscount={true} />
            ))
          ) : (
            <EmptyPage />
          )}
        </div>
      )}

      {totalPages > 1 && (
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};