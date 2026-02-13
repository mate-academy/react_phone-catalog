import { getTablets } from '../../api';
import { useEffect, useState } from 'react';
import { TabletModel } from '../../types/model';
import { useSearchParams } from 'react-router-dom';
import { TabletsSection } from './Sections/TabletsSection';
import { modelsSortAsync } from '../../utils/filterByModel';
import { applyPagination } from '../../utils/applyPagination';
import { PageTop } from '../../components/PageTop';
import Loader from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<TabletModel[]>([]); // Поточна сторінка
  const [coreTablets, setCoreTablets] = useState<TabletModel[]>([]); // Несортовані, всі
  const [sortedTablets, setSortedTablets] = useState<TabletModel[]>([]); // <--- Змінено назву для ясності
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const page = searchParams.get('page') || 1;
  const sort = searchParams.get('sort') || '';
  const quantity = searchParams.get('quantity') || '16';

  const handleSetCurrentPage = (currentPage: number) => {
    const params = new URLSearchParams(searchParams);
    const value = String(currentPage);

    params.set('page', value);

    setSearchParams(params);
  };

  const handleSetNextPage = (currentPage: number, pages: number[]) => {
    const params = new URLSearchParams(searchParams);
    let value;

    if (pages.length <= currentPage) {
      value = String(pages.length);
    } else {
      value = String(currentPage + 1);
    }

    params.set('page', value);

    setSearchParams(params);
  };

  const handleSetPrevPage = (currentPage: number) => {
    const params = new URLSearchParams(searchParams);
    let value;

    if (currentPage <= 1) {
      value = String(1);
    } else {
      value = String(currentPage - 1);
    }

    params.set('page', value);

    setSearchParams(params);
  };

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const tabletsData = await getTablets();

        setCoreTablets(tabletsData);
      } catch (e) {
        setIsLoading(false);
        setError('Something went wrong ');
      }
    };

    fetchTablets();
  }, []);
  useEffect(() => {
    if (coreTablets.length === 0) {
      return;
    }

    const processTablets = async () => {
      try {
        const sortedTabletsData = (await modelsSortAsync(
          coreTablets,
          sort,
        )) as TabletModel[];

        setSortedTablets(sortedTabletsData);

        const paginatedTablets = applyPagination(
          sortedTabletsData,
          page,
          quantity,
          setSearchParams,
          searchParams,
        );

        setTablets(paginatedTablets as TabletModel[]); // <--- Зберегти лише поточну сторінку
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError('Something went wrong ');
      }
    };

    processTablets();
  }, [sort, coreTablets, page, quantity, searchParams, setSearchParams]);

  const quantityNumber =
    quantity === 'all' ? coreTablets.length : Number(quantity);

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <ErrorMessage errorMessage={error} />
      ) : (
        <>
          <PageTop
            titleLevel="1"
            titleText="Tablets"
            modelsAmount={coreTablets.length}
          ></PageTop>
          <TabletsSection
            paginatedTablets={tablets}
            fullSortedTablets={sortedTablets}
            handleSetNextPage={handleSetNextPage}
            handleSetPrevPage={handleSetPrevPage}
            page={page}
            handleSetCurrentPage={handleSetCurrentPage}
            quantity={quantityNumber}
          />
        </>
      )}
    </>
  );
};
