import { useContext, useMemo } from 'react';
import { ContextApp } from '../../appContext/AppContext';
import Styles from './Tablets.module.scss';
import { Pagination } from '../../pagination';
import { sortBy } from '../../functions/sortBy';
import { Skeleton } from '../../skeletons/Skelton';
import { ProductCard } from '../productCard';
import { Crumbs } from '../breadCrumbs/Crumbs';
import { Reload } from '../reload/Reload';

export const Tablets: React.FC = () => {
  const {
    tabletsTotalNumber,
    isLoadingTablets,
    tablets,
    products,
    selectedOption,
    itemsPerPage,
    activePage,
    handleChangeItems,
    handleChangeSort,
    handlePageChange,
    loadingErr,
  } = useContext(ContextApp);

  const sortedPhones = sortBy(products, tablets, selectedOption);

  const pagesTotalNumber = useMemo(() => {
    if (itemsPerPage === 'all') {
      return 1;
    }
    return Math.ceil(tabletsTotalNumber / +itemsPerPage);
  }, [tabletsTotalNumber, itemsPerPage]);

  const startFromElement = +itemsPerPage * activePage - +itemsPerPage;
  const endOnElement = Math.min(+itemsPerPage * activePage, tabletsTotalNumber);

  const tabletsOnPage =
    itemsPerPage === 'all'
      ? sortedPhones
      : sortedPhones.slice(startFromElement, endOnElement);

  return (
    <div className={Styles['tablets']}>
      {isLoadingTablets && <Skeleton />}

      {!isLoadingTablets && tabletsTotalNumber === 0 && (
        <p className={Styles.tablets__no_item}>There are no tablets yet</p>
      )}

      {!isLoadingTablets && loadingErr && <Reload />}

      {!isLoadingTablets && !loadingErr && tabletsTotalNumber !== 0 && (
        <>
          <Crumbs path={['tablets']} />

          <div className={Styles['tablets__head']}>
            <h1 className={Styles['tablets__head__title']}>Tablets</h1>
            <p className={Styles['tablets__head__paragraph']}>
              {tabletsTotalNumber} models
            </p>
          </div>
          <div className={Styles['tablets__filters']}>
            <div className={Styles['tablets__filters__sort']}>
              <p className={Styles['tablets__filters__sort__paragraph']}>
                Sort by
              </p>

              <select
                className={Styles['tablets__filters__sort__select']}
                value={selectedOption}
                onChange={handleChangeSort}
              >
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className={Styles['tablets__filters__items']}>
              <p className={Styles['tablets__filters__items__paragraph']}>
                Items on page
              </p>

              <select
                className={Styles['tablets__filters__items__select']}
                value={itemsPerPage}
                onChange={handleChangeItems}
              >
                <option value="all">All</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
              </select>
            </div>
          </div>
          <div className={Styles['tablets__container']}>
            {tabletsOnPage.map(phone => {
              return (
                <ProductCard key={phone.id} type={'tablets'} product={phone} />
              );
            })}
          </div>
          <div className={Styles['tablets__choose_page']}>
            <Pagination
              pagesTotalNumber={pagesTotalNumber}
              activePage={activePage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};
