import { useContext, useMemo } from 'react';
import { ContextApp } from '../../appContext/AppContext';
import style from './Accessories.module.scss';
import { Pagination } from '../../pagination';
import { sortBy } from '../../functions/sortBy';
import { Skeleton } from '../../skeletons/Skelton';
import { ProductCard } from '../productCard';
import { Crumbs } from '../breadCrumbs/Crumbs';

export const Accessories: React.FC = () => {
  const {
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
    <div className={style['accessories']}>
      {isLoadingAccessories && <Skeleton />}

      {!isLoadingAccessories && (
        <>
          <Crumbs path={['accessories']} />

          <div className={style['accessories__head']}>
            <h1 className={style['accessories__head__title']}>Accessories</h1>
            <p className={style['accessories__head__paragraph']}>
              {accessoriesTotalNumber} models
            </p>
          </div>
          <div className={style['accessories__filters']}>
            <div className={style['accessories__filters__sort']}>
              <p className={style['accessories__filters__sort__paragraph']}>
                Sort by
              </p>

              <select
                className={style['accessories__filters__sort__select']}
                value={selectedOption}
                onChange={handleChangeSort}
              >
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className={style['accessories__filters__items']}>
              <p className={style['accessories__filters__items__paragraph']}>
                Items on page
              </p>

              <select
                className={style['accessories__filters__items__select']}
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
          <div className={style['accessories__container']}>
            {accessoriesOnPage.map(accessory => {
              return (
                <ProductCard
                  type={'accessories'}
                  key={accessory.id}
                  product={accessory}
                />
              );
            })}
          </div>
          <div className={style['accessories__choose_page']}>
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
