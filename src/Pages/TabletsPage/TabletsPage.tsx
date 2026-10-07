import { getTablets } from '../../api';
import { useEffect, useState } from 'react';
import { TabletModel } from '../../types/model';
import { useSearchParams } from 'react-router-dom';
import { TabletsSection } from './Sections/TabletsSection';
import { modelsSortAsync } from '../../utils/filterByModel';
import { applyPagination } from '../../utils/applyPagination';
import { PageTop } from '../../components/PageTop';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SkeletonCard } from '../../components/SkeletonCard';
import { ModelsSortForm } from '../../components/ModelsSortForm';
import { EmptySearch } from '../../components/EmptySearch';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<TabletModel[]>([]);
  const [coreTablets, setCoreTablets] = useState<TabletModel[]>([]);
  const [sortedTablets, setSortedTablets] = useState<TabletModel[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const page = searchParams.get('page') || 1;
  const sort = searchParams.get('sort') || '';
  const quantity = searchParams.get('quantity') || '16';
  const query = searchParams.get('query') || '';

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
        setError('Something went wrong');
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
        const queryTrimmed = query.trim().toLowerCase();
        let filteredByQuery = coreTablets;

        if (queryTrimmed) {
          filteredByQuery = coreTablets.filter(tablet =>
            tablet.name.toLowerCase().includes(queryTrimmed),
          );
        }

        const sortedTabletsData = (await modelsSortAsync(
          filteredByQuery,
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

        setTablets(paginatedTablets as TabletModel[]);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError('Something went wrong');
      }
    };

    processTablets();
  }, [sort, coreTablets, page, quantity, query, searchParams, setSearchParams]);

  const quantityNumber =
    quantity === 'all' ? coreTablets.length : Number(quantity);
  const hasNoSearchResults = query.trim() && sortedTablets.length === 0;

  return (
    <>
      <PageTop
        titleLevel="1"
        titleText="Tablets"
        modelsAmount={sortedTablets.length}
      />
      {isLoading ? (
        <section className="phone-section">
          <ModelsSortForm />
          <SkeletonCard
            count={
              quantityNumber > 0 && quantityNumber <= 16 ? quantityNumber : 8
            }
            isGrid={true}
          />
        </section>
      ) : error ? (
        <ErrorMessage errorMessage={error} />
      ) : hasNoSearchResults ? (
        <EmptySearch message="There are no tablets matching the query" />
      ) : (
        <TabletsSection
          paginatedTablets={tablets}
          fullSortedTablets={sortedTablets}
          handleSetNextPage={handleSetNextPage}
          handleSetPrevPage={handleSetPrevPage}
          page={page}
          handleSetCurrentPage={handleSetCurrentPage}
          quantity={quantityNumber}
        />
      )}
    </>
  );
};
