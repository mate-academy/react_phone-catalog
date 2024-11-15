import React from 'react';
import { useContext, useMemo } from 'react';
import { ContextApp } from '../../appContext/AppContext';
import Styles from './Accessories.module.scss';
import { Pagination } from '../../pagination';
import { sortBy } from '../../functions/sortBy';
import { Skeleton } from '../../skeletons/Skelton';
import { ProductCard } from '../productCard';
import { Crumbs } from '../breadCrumbs/Crumbs';
import { Reload } from '../reload/Reload';

export const Accessories: React.FC = () => {
  const {
    loadingErrAccessories,
    accessoriesTotalNumber,
    isLoadingAccessories,
    accessories,
    products,
    handleChangeItems,
    handleChangeSort,
    handlePageChange,
    selectedOption,
    itemsPerPage,
    activePage,
    loadingErr,
  } = useContext(ContextApp);

  const sortedAccessories = sortBy(products, accessories, selectedOption);

  const pagesTotalNumber = useMemo(() => {
    if (itemsPerPage === 'all') {
      return 1;
    }
    return Math.ceil(accessoriesTotalNumber / +itemsPerPage);
  }, [accessoriesTotalNumber, itemsPerPage]);

  const startFromElement = +itemsPerPage * activePage - +itemsPerPage;

  const endOnElement = Math.min(
    +itemsPerPage * activePage,
    accessoriesTotalNumber,
  );

  const accessoriesOnPage =
    itemsPerPage === 'all'
      ? sortedAccessories
      : sortedAccessories.slice(startFromElement, endOnElement);

  return (
    <div className={Styles['accessories']}>
      {isLoadingAccessories && <Skeleton />}

      {!isLoadingAccessories && accessoriesTotalNumber === 0 && (
        <p className={Styles.accessories__no_item}>There are no accessories yet</p>
      )}

      {!isLoadingAccessories && loadingErr && !loadingErrAccessories && <Reload />}

      {!isLoadingAccessories && !loadingErr && (
        <>
          <Crumbs path={['accessories']} />

          <div className={Styles['accessories__head']}>
            <h1 className={Styles['accessories__head__title']}>Accessories</h1>
            <p className={Styles['accessories__head__paragraph']}>
              {accessoriesTotalNumber} models
            </p>
          </div>
          <div className={Styles['accessories__filters']}>
            <div className={Styles['accessories__filters__sort']}>
              <p className={Styles['accessories__filters__sort__paragraph']}>
                Sort by
              </p>

              <select
                className={Styles['accessories__filters__sort__select']}
                value={selectedOption}
                onChange={handleChangeSort}
              >
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className={Styles['accessories__filters__items']}>
              <p className={Styles['accessories__filters__items__paragraph']}>
                Items on page
              </p>

              <select
                className={Styles['accessories__filters__items__select']}
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
          <div className={Styles['accessories__container']}>
            {accessoriesOnPage.map(accessory => {
              return (
                <ProductCard
                  style={{
                    transform: `translateX(0px)`,
                    transition: 'transform 0s ease-in-out',
                  }}
                  type={'accessories'}
                  key={accessory.id}
                  product={accessory}
                />
              );
            })}
          </div>
          <div className={Styles['accessories__choose_page']}>
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
