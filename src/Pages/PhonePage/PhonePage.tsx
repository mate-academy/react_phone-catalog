import { useEffect, useState } from 'react';
import { PhonesSection } from './Sections/PhonesSection';
import { PhoneModel } from '../../types/model';
import { useSearchParams } from 'react-router-dom';
import { getPhones } from '../../api';
import { applyPagination } from '../../utils/applyPagination';
import { modelsSortAsync } from '../../utils/filterByModel';
import { PageTop } from '../../components/PageTop';
import Loader from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

// Phone Page Component

export const PhonePage = () => {
  const [phones, setPhones] = useState<PhoneModel[]>([]);
  const [initialPhones, setInitialPhones] = useState<PhoneModel[]>([]);
  // eslint-disable-next-line max-len, prettier/prettier
  const [sortedAndPaginatedPhones, setSortedAndPaginatedPhones] = useState<PhoneModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '1';
  const quantity = searchParams.get('quantity') || '16';

  const handleSetCurrentPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(newPage));
    setSearchParams(params);
  };

  const handleSetNextPage = (currentPageNum: number, pages: number[]) => {
    const params = new URLSearchParams(searchParams);
    const nextPage = Math.min(pages.length, currentPageNum + 1);

    params.set('page', String(nextPage));
    setSearchParams(params);
  };

  const handleSetPrevPage = (currentPageNum: number) => {
    const params = new URLSearchParams(searchParams);
    const prevPage = Math.max(1, currentPageNum - 1);

    params.set('page', String(prevPage));
    setSearchParams(params);
  };

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const phonesData = await getPhones();

        setInitialPhones(phonesData);
      } catch (e) {
        setIsLoading(false);
        setError('Something went wrong ');
      }
    };

    fetchPhones();
  }, []);

  useEffect(() => {
    if (initialPhones.length === 0) {
      return;
    }

    setIsLoading(true);

    const processPhones = async () => {
      try {
        const sortedPhones = (await modelsSortAsync(
          initialPhones,
          sort,
        )) as PhoneModel[];

        setSortedAndPaginatedPhones(sortedPhones);

        const paginatedPhones = applyPagination(
          sortedPhones,
          page,
          quantity,
          setSearchParams,
          searchParams,
        );

        setPhones(paginatedPhones as PhoneModel[]);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError('Something went wrong ');
      }
    };

    processPhones();
  }, [initialPhones, sort, page, quantity, searchParams, setSearchParams]);

  const quantityNumber =
    quantity === 'all' ? initialPhones.length : Number(quantity);

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
            titleText="Mobile phones"
            modelsAmount={sortedAndPaginatedPhones.length}
          ></PageTop>
          <PhonesSection
            paginatedPhones={phones}
            fullSortedPhones={sortedAndPaginatedPhones}
            handleSetCurrentPage={handleSetCurrentPage}
            handleSetNextPage={handleSetNextPage}
            handleSetPrevPage={handleSetPrevPage}
            page={page}
            quantity={quantityNumber}
          />
        </>
      )}
    </>
  );
};
