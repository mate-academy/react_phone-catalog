/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { getAccessories } from '../../api';
import { AccessoriesModel } from '../../types/model';
import { useSearchParams } from 'react-router-dom';
import { AccessoriesSection } from './Sections/AccessoriesSection';
import { modelsSortAsync } from '../../utils/filterByModel';
import { applyPagination } from '../../utils/applyPagination';
import { PageTop } from '../../components/PageTop';
import Loader from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<AccessoriesModel[]>([]);
  const [coreAccessories, setCoreAccessories] = useState<AccessoriesModel[]>(
    [],
  );
  const [sortedAccessories, setSortedAccessories] = useState<
    AccessoriesModel[]
  >([]);
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
    const fetchAccessories = async () => {
      try {
        const accessoriesData = await getAccessories();

        setCoreAccessories(accessoriesData);
      } catch (e) {
        setIsLoading(false);
        setError('Something went wrong ');
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
        const sortedAccessoriesData = (await modelsSortAsync(
          coreAccessories,
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
        // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        setIsLoading(false);
        setError('Something went wrong ');
      }
    };

    processAccessories();
  }, [sort, coreAccessories, page, quantity, searchParams, setSearchParams]);

  const quantityNumber =
    quantity === 'all' ? coreAccessories.length : Number(quantity);

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <ErrorMessage errorMessage={error} />
      ) : (
        <>
          <PageTop
            modelsAmount={coreAccessories.length}
            titleLevel="1"
            titleText="Accessories"
          ></PageTop>
          <AccessoriesSection
            paginatedAccessories={accessories}
            fullSortedAccessories={sortedAccessories}
            handleSetCurrentPage={handleSetCurrentPage}
            handleSetNextPage={handleSetNextPage}
            handleSetPrevPage={handleSetPrevPage}
            quantity={quantityNumber}
            page={page}
          />
        </>
      )}
    </>
  );
};
