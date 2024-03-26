import './AccessoriesPage.scss';
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

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [displayedAccessories, setDisplayedAccessories] = useState<Product[]>(
    [],
  );

  const [maxLength, setMaxLength] = useState(accessories.length);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getData
      .getProducts('accessory')
      .then(data => {
        setAccessories(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query');
  const sortBy = searchParams.get('sort') || '';
  const perPageStr = searchParams.get('perPage') || `${accessories.length}`;
  const perPage = +perPageStr;
  const currentPage = searchParams.get('page') || 1;

  useEffect(() => {
    const paginationBlocks = [];
    let sortedAccessories = [...accessories];

    if (sortBy === 'age') {
      sortedAccessories.sort((a, b) => a.year - b.year);
    }

    if (sortBy === 'name') {
      sortedAccessories.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'price') {
      sortedAccessories.sort((a, b) => a.price - b.price);
    }

    if (query) {
      sortedAccessories = sortedAccessories.filter(el =>
        el.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setMaxLength(sortedAccessories.length);

    for (let i = 0; i < sortedAccessories.length; i += perPage) {
      paginationBlocks.push(sortedAccessories.slice(i, i + perPage));
    }

    setDisplayedAccessories(paginationBlocks[+currentPage - 1] || []);
  }, [sortBy, perPage, currentPage, query, accessories]);

  return (
    <main className="page">
      <BreadCrumbs name="Accessories" />
      {displayedAccessories.length === 0 ? (
        <NoResults categoryName="Accessories" />
      ) : (
        <div className="page__content">
          <h1 className="page__title">Accessories</h1>
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
          {!isLoading && <ProductsList items={displayedAccessories} />}
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
