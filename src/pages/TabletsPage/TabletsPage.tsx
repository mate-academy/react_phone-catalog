/* eslint-disable @typescript-eslint/indent */
import './TabletsPage.scss';

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { Filters } from '../../components/Filters';
import { Product } from '../../types/Product';
import { getTablets } from '../../api/products';
import { Pagination } from '../../components/Pagination';
import { FilterItems } from '../../types/FilterItems';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults';
import { getCorrectArrayProducts } from '../../helpers/getCorrectArrayProducts';

export const TabletsPage = () => {
  const [searchParams] = useSearchParams();

  const searchPage = searchParams.get('page') || 1;
  const filter = searchParams.get('sort') || 'age';
  const count = searchParams.get('perPage') || 'all';

  const [tablets, setTablets] = useState<[] | Product[]>([]);
  const [filterItem, setFilterItem] = useState<FilterItems>({
    filter,
    count,
  });
  const [filteredTablets, setFilteredTablets] = useState<[] | Product[]>([]);
  const [currentPage, setCurrentPage] = useState(+searchPage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTablets()
      .then(products => {
        setTablets(products);
        setFilteredTablets(
          getCorrectArrayProducts(tablets, filterItem, currentPage),
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredTablets(
      getCorrectArrayProducts(tablets, filterItem, currentPage),
    );
  }, [tablets, filterItem, currentPage]);

  return (
    <div className="tabletsPage">
      {isLoading && tablets.length > 0 && (
        <div className="tabletsPage__loader">
          <Loader />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="tabletsPage__link">
            <Link to="/" className="icon icon--home" />
            <div className="icon icon--arrow-right--disabled" />
            <div className="tabletsPage__link-text">Tablets</div>
          </div>

          {tablets.length === 0 && !isLoading ? (
            <NoResults categoryName="Tablets" />
          ) : (
            <>
              <h1 className="tabletsPage__title">Tablets</h1>

              <p className="tabletsPage__text">{`${tablets.length} models`}</p>

              <div className="tabletsPage__filters">
                <Filters
                  setFilterItem={setFilterItem}
                  filterItem={filterItem}
                />
              </div>

              <div className="tabletsPage__list">
                <ProductsList products={filteredTablets} />
              </div>

              {filterItem.count !== 'all' &&
                tablets.length > +filterItem.count && (
                  <div className="tabletsPage__pagination">
                    <Pagination
                      productsLength={tablets.length}
                      countLength={filterItem.count}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                )}
            </>
          )}
        </>
      )}
    </div>
  );
};
