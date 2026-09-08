/* eslint-disable react-hooks/rules-of-hooks */
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../ProductsList';
import { Device, ProductType } from '../../types';
import { useEffect, useState } from 'react';
import { TabsNumbered } from './TabsNumbered';
import { useLanguage } from '../../../contexts/LanguageContext';

import styles from './Tabs.module.scss';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface TabsProps {
  allDevices: Device[];
}

export const Tabs: React.FC<TabsProps> = ({ allDevices }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const pageParam = searchParams.get('page');

  const [currentPage, setCurrentPage] = useState<number>(() =>
    pageParam ? +pageParam : 1,
  );
  const { type } = useParams<{ type: ProductType }>();
  const { t } = useLanguage();

  const sortedDevices = [...allDevices].filter(
    device => device.category === type,
  );

  const tabsParam = searchParams.get('tabs');
  const pageSize = tabsParam ? Number(tabsParam) : 8;

  // Basics.
  const totalPages = Math.ceil(sortedDevices.length / pageSize);

  const paginate = <T,>(items: T[], page: number, pSize: number): T[] => {
    const start = (page - 1) * pSize;

    return items.slice(start, start + pSize);
  };

  const normalizedSearch = search?.toLowerCase().trim();

  const productsToRender = paginate(
    [...sortedDevices]
      .filter(
        device =>
          !normalizedSearch ||
          device.name.toLowerCase().includes(normalizedSearch),
      )
      .sort((a, b) => {
        if (!sort) {
          return 0;
        }

        switch (sort) {
          case 'Newest':
            return b.year - a.year;
          case 'Alphabetically':
            return a.name.localeCompare(b.name);
          case 'Cheapest':
            return a.price - b.price;
          default:
            return 0;
        }
      }),
    currentPage,
    pageSize,
  );

  const movePrev = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
  };

  const moveNext = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : totalPages));
  };

  const handlePageSelect = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  if (!type) {
    return <div>Invalid product type</div>;
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [type]);

  useEffect(() => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('page', String(currentPage));

      return params;
    });
  }, [currentPage, setSearchParams]);

  return (
    <div className={styles.tabs__Container}>
      {productsToRender.length > 0 ? (
        <>
          <ProductsList productsToRender={productsToRender} />
          <div className={styles.tabs__Navigation}>
            <button className={styles.tabs__Button} onClick={movePrev}>
              <ChevronLeft />
            </button>
            <TabsNumbered
              maxButtons={4}
              currentPage={currentPage}
              totalPages={totalPages}
              onClick={handlePageSelect}
            />
            <button className={styles.tabs__Button} onClick={moveNext}>
              <ChevronRight />
            </button>
          </div>
        </>
      ) : (
        <h1>{t('catalog.noDevices')}</h1>
      )}
    </div>
  );
};
