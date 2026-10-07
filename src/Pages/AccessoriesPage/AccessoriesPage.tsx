import { useEffect, useState } from 'react';
import { getAccessories } from '../../api';
import { AccessoriesModel } from '../../types/model';
import { useSearchParams } from 'react-router-dom';
import { AccessoriesSection } from './Sections/AccessoriesSection';
import { modelsSortAsync } from '../../utils/filterByModel';
import { applyPagination } from '../../utils/applyPagination';
import { PageTop } from '../../components/PageTop';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SkeletonCard } from '../../components/SkeletonCard';
import { ModelsSortForm } from '../../components/ModelsSortForm';
import { EmptySearch } from '../../components/EmptySearch';

type AccModel = AccessoriesModel;

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<AccModel[]>([]);
  const [coreAccessories, setCoreAccessories] = useState<AccModel[]>([]);
  const [sortedAccessories, setSortedAccessories] = useState<AccModel[]>([]);
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
    const fetchAccessories = async () => {
      try {
        const accessoriesData = await getAccessories();

        setCoreAccessories(accessoriesData);
      } catch (e) {
        setIsLoading(false);
        setError('Something went wrong');
      }
    };

    fetchAccessories();
  }, []);

  useEffect(() => {
    if (coreAccessories.length === 0) {
      return;
    }

    const processAccessories = async () => {
      try {
        const queryTrimmed = query.trim().toLowerCase();
        let filteredByQuery = coreAccessories;

        if (queryTrimmed) {
          filteredByQuery = coreAccessories.filter(item =>
            item.name.toLowerCase().includes(queryTrimmed),
          );
        }

        const sortedAccessoriesData = (await modelsSortAsync(
          filteredByQuery,
          sort,
        )) as AccessoriesModel[];

        setSortedAccessories(sortedAccessoriesData);

        const paginatedAccessories = applyPagination(
          sortedAccessoriesData,
          page,
          quantity,
          setSearchParams,
          searchParams,
        );

        setAccessories(paginatedAccessories as AccessoriesModel[]);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError('Something went wrong');
      }
    };

    processAccessories();
  }, [
    sort,
    coreAccessories,
    page,
    quantity,
    query,
    searchParams,
    setSearchParams,
  ]);

  const quantityNumber =
    quantity === 'all' ? coreAccessories.length : Number(quantity);
  const hasNoSearchResults = query.trim() && sortedAccessories.length === 0;

  return (
    <>
      <PageTop
        modelsAmount={sortedAccessories.length}
        titleLevel="1"
        titleText="Accessories"
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
        <EmptySearch message="There are no accessories matching the query" />
      ) : (
        <AccessoriesSection
          paginatedAccessories={accessories}
          fullSortedAccessories={sortedAccessories}
          handleSetCurrentPage={handleSetCurrentPage}
          handleSetNextPage={handleSetNextPage}
          handleSetPrevPage={handleSetPrevPage}
          quantity={quantityNumber}
          page={page}
        />
      )}
    </>
  );
};
