import { useEffect, useState } from 'react';
import './TabletsPage.scss';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { DropDown } from '../../components/DropDown';
import { perPageVariants, sortByVariants } from '../../constants';
import { getTablets } from '../../helpers/getTablets';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Pagination } from '../../components/Pagination';
import { NoResults } from '../../components/NoResults';
import { BreadCrumbs } from '../../components/BreadCrumbs';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Phone[]>([]);
  const [displayedTablets, setDisplayedTablets] = useState<Phone[]>([]);

  let sortedTablets = tablets;

  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getTablets()
      .then(data => {
        setTablets(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query');
  const sortBy = searchParams.get('sort') || '';
  const perPageStr = searchParams.get('perPage') || `${sortedTablets.length}`;
  const perPage = +perPageStr;
  const currentPage = searchParams.get('page') || 1;

  if (sortBy === 'age') {
    sortedTablets = sortedTablets.sort((a, b) => a.age - b.age);
  }

  if (sortBy === 'name') {
    sortedTablets = sortedTablets.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === 'price') {
    sortedTablets = sortedTablets.sort((a, b) => a.price - b.price);
  }

  if (query) {
    console.log('search');
    sortedTablets = sortedTablets.filter(el =>
      el.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  useEffect(() => {
    console.log('use');
    const newArr = [];

    for (let i = 0; i < sortedTablets.length; i += perPage) {
      newArr.push(sortedTablets.slice(i, i + perPage));
    }

    setDisplayedTablets(newArr[+currentPage - 1] || []);
  }, [sortBy, perPage, currentPage, sortedTablets, searchParams]);

  return (
    <>
      {displayedTablets.length === 0 ? (
        <NoResults categoryName="Tablets" />
      ) : (
        <>
          <BreadCrumbs name="Tablets" />
          <div className="container page__container ">
            <h1 className="page__title">Tablets</h1>
            <p className="page__count">{tablets.length} models</p>
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
            {perPage < tablets.length && (
              <Pagination
                total={tablets.length}
                perPage={perPage}
                currentPage={+currentPage}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
