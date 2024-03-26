import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { DropDown } from '../../components/DropDown';
import { perPageVariants, sortByVariants } from '../../constants';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Pagination } from '../../components/Pagination';
import { NoResults } from '../../components/NoResults';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { getData } from '../../helpers/getData';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [displayedTablets, setDisplayedTablets] = useState<Product[]>([]);

  const [maxLength, setMaxLength] = useState(tablets.length);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getData
      .getProducts('tablets')
      .then(data => {
        setTablets(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query');
  const sortBy = searchParams.get('sort') || '';
  const perPageStr = searchParams.get('perPage') || `${tablets.length}`;
  const perPage = +perPageStr;
  const currentPage = searchParams.get('page') || 1;

  useEffect(() => {
    const paginationBlocks = [];
    let sortedTablets = [...tablets];

    if (sortBy === 'age') {
      sortedTablets.sort((a, b) => a.year - b.year);
    }

    if (sortBy === 'name') {
      sortedTablets.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'price') {
      sortedTablets.sort((a, b) => a.price - b.price);
    }

    if (query) {
      sortedTablets = sortedTablets.filter(el =>
        el.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setMaxLength(sortedTablets.length);

    for (let i = 0; i < sortedTablets.length; i += perPage) {
      paginationBlocks.push(sortedTablets.slice(i, i + perPage));
    }

    setDisplayedTablets(paginationBlocks[+currentPage - 1] || []);
  }, [sortBy, perPage, currentPage, query, tablets]);

  return (
    <main className="page">
      <BreadCrumbs name="Tablets" />
      {displayedTablets.length === 0 ? (
        <NoResults categoryName="Tablets" />
      ) : (
        <div className="page__content">
          <h1 className="page__title">Tablets</h1>
          <p className="page__count">{maxLength} models</p>
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

          {isLoading && <Loader />}
          {!isLoading && <ProductsList items={displayedTablets} />}
          {perPage < maxLength && (
            <Pagination
              total={maxLength}
              perPage={perPage}
              currentPage={+currentPage}
            />
          )}
        </div>
      )}
    </main>
  );
};
