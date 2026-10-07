import { useEffect, useState } from 'react';
import { PhonesSection } from './Sections/PhonesSection';
import { PhoneModel } from '../../types/model';
import { useSearchParams } from 'react-router-dom';
import { getPhones } from '../../api';
import { applyPagination } from '../../utils/applyPagination';
import { modelsSortAsync } from '../../utils/filterByModel';
import { PageTop } from '../../components/PageTop';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SkeletonCard } from '../../components/SkeletonCard';
import { ModelsSortForm } from '../../components/ModelsSortForm';
import { EmptySearch } from '../../components/EmptySearch';

export const PhonePage = () => {
  const [phones, setPhones] = useState<PhoneModel[]>([]);
  const [initialPhones, setInitialPhones] = useState<PhoneModel[]>([]);
  const [sortedPhones, setSortedPhones] = useState<PhoneModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '1';
  const quantity = searchParams.get('quantity') || '16';
  const query = searchParams.get('query') || '';

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
        setError('Something went wrong');
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
        const queryTrimmed = query.trim().toLowerCase();
        let filteredByQuery = initialPhones;

        if (queryTrimmed) {
          filteredByQuery = initialPhones.filter(phone =>
            phone.name.toLowerCase().includes(queryTrimmed),
          );
        }

        const processedPhones = (await modelsSortAsync(
          filteredByQuery,
          sort,
        )) as PhoneModel[];

        setSortedPhones(processedPhones);

        const paginatedPhones = applyPagination(
          processedPhones,
          page,
          quantity,
          setSearchParams,
          searchParams,
        );

        setPhones(paginatedPhones as PhoneModel[]);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError('Something went wrong');
      }
    };

    processPhones();
  }, [
    initialPhones,
    sort,
    page,
    quantity,
    query,
    searchParams,
    setSearchParams,
  ]);

  const quantityNumber =
    quantity === 'all' ? initialPhones.length : Number(quantity);
  const hasNoSearchResults = query.trim() && sortedPhones.length === 0;

  return (
    <>
      <PageTop
        titleLevel="1"
        titleText="Mobile phones"
        modelsAmount={sortedPhones.length}
      />
      {isLoading ? (
        <section className="phones-section">
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
        <EmptySearch message="There are no phones matching the query" />
      ) : (
        <PhonesSection
          paginatedPhones={phones}
          fullSortedPhones={sortedPhones}
          handleSetCurrentPage={handleSetCurrentPage}
          handleSetNextPage={handleSetNextPage}
          handleSetPrevPage={handleSetPrevPage}
          page={page}
          quantity={quantityNumber}
        />
      )}
    </>
  );
};
