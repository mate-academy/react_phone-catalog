import { useEffect, useState } from 'react';
import './PhonePage.scss';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { DropDown } from '../../components/DropDown';
import { perPageVariants, sortByVariants } from '../../constants';
import { Pagination } from '../../components/Pagination';
import { NoResults } from '../../components/NoResults';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { NoSearchResults } from '../../components/NoSearchResults';
import { getData } from '../../helpers/getData';

export const PhonePage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [displayedPhones, setDisplayedPhones] = useState<Product[]>([]);
  const [maxLength, setMaxLength] = useState(phones.length);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [noSearchResult, setNoSearchResult] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData
      .getProducts('phones')
      .then(data => {
        setPhones(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query');
  const sortBy = searchParams.get('sort') || '';
  const perPageStr = searchParams.get('perPage') || `${phones.length}`;
  const perPage = +perPageStr;
  const currentPage = searchParams.get('page') || 1;

  useEffect(() => {
    const paginationBlocks = [];
    let sortedPhones = [...phones];

    if (sortBy === 'age') {
      sortedPhones.sort((a, b) => a.year - b.year);
    }

    if (sortBy === 'name') {
      sortedPhones.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'price') {
      sortedPhones.sort((a, b) => a.price - b.price);
    }

    if (query) {
      setNoSearchResult(false);
      sortedPhones = sortedPhones.filter(el =>
        el.name.toLowerCase().includes(query.toLowerCase()),
      );
      if (sortedPhones.length === 0) {
        setNoSearchResult(true);
      }
    }

    setMaxLength(sortedPhones.length);

    for (let i = 0; i < sortedPhones.length; i += perPage) {
      paginationBlocks.push(sortedPhones.slice(i, i + perPage));
    }

    setDisplayedPhones(paginationBlocks[+currentPage - 1] || []);
  }, [sortBy, perPage, currentPage, query, phones]);

  return (
    <>
      {displayedPhones.length === 0 && !noSearchResult ? (
        <NoResults categoryName="Phones" />
      ) : (
        <main className="page">
          <BreadCrumbs name="Phones" />
          <div className="page__content">
            <h1 className="page__title">Mobile phones</h1>
            <p className="page__count">{maxLength} models</p>
            {noSearchResult ? (
              <NoSearchResults />
            ) : (
              <div className="page__catalog-settings">
                <DropDown
                  title="Sort by"
                  dropDownArrayData={sortByVariants}
                  startedValue={sortBy}
                />
                <DropDown
                  title="Items on page"
                  dropDownArrayData={perPageVariants}
                  startedValue={perPageStr}
                />
              </div>
            )}

            {isLoading && <Loader />}
            {!isLoading && <ProductsList items={displayedPhones} />}
            {perPage < maxLength && (
              <Pagination
                total={maxLength}
                perPage={perPage}
                currentPage={+currentPage}
              />
            )}
          </div>
        </main>
      )}
    </>
  );
};
