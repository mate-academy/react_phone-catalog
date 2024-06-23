/* eslint-disable @typescript-eslint/indent */
import './AccessoriesPage.scss';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { Filters } from '../../components/Filters';
import { Product } from '../../types/Product';
import { getAccessories } from '../../api/products';
import { Pagination } from '../../components/Pagination';
import { FilterItems } from '../../types/FilterItems';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults';
import { getCorrectArrayProducts } from '../../helpers/getCorrectArrayProducts';

export const AccessoriesPage = () => {
  const [searchParams] = useSearchParams();

  const searchPage = searchParams.get('page') || 1;
  const filter = searchParams.get('sort') || 'age';
  const count = searchParams.get('perPage') || 'all';

  const [accessories, setAccessories] = useState<[] | Product[]>([]);
  const [filterItem, setFilterItem] = useState<FilterItems>({
    filter,
    count,
  });

  const [filteredAccessories, setFilteredAccessories] = useState<
    [] | Product[]
  >([]);

  const [currentPage, setCurrentPage] = useState(+searchPage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAccessories()
      .then(products => {
        setAccessories(products);
        setFilteredAccessories(
          getCorrectArrayProducts(accessories, filterItem, currentPage),
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredAccessories(
      getCorrectArrayProducts(accessories, filterItem, currentPage),
    );
  }, [accessories, filterItem, currentPage]);

  return (
    <div className="accessoriesPage">
      {accessories.length === 0 && !isLoading && (
        <NoResults categoryName="Accessories" />
      )}

      {isLoading && accessories.length > 0 && (
        <div className="accessoriesPage__loader">
          <Loader />
        </div>
      )}

      {!isLoading && accessories.length > 0 && (
        <>
          <div className="accessoriesPage__link">
            <div className="icon icon--home" />
            <div className="icon icon--arrow-right--disabled" />
            <div className="accessoriesPage__link-text">Accessories</div>
          </div>

          <h1 className="accessoriesPage__title">Accessories</h1>

          <p className="accessoriesPage__text">{`${accessories.length} models`}</p>

          <div className="accessoriesPage__filters">
            <Filters setFilterItem={setFilterItem} filterItem={filterItem} />
          </div>

          <div className="accessoriesPage__list">
            <ProductsList products={filteredAccessories} />
          </div>

          {filterItem.count !== 'all' &&
            accessories.length > +filterItem.count && (
              <div className="accessoriesPage__pagination">
                <Pagination
                  productsLength={accessories.length}
                  countLength={filterItem.count}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
        </>
      )}
    </div>
  );
};
