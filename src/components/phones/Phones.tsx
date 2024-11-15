import { useContext, useMemo } from 'react';
import { ContextApp } from '../../appContext/AppContext';
import Styles from './Phones.module.scss';
import { Pagination } from '../../pagination';
import { sortBy } from '../../functions/sortBy';
import { Skeleton } from '../../skeletons/Skelton';
import { ProductCard } from '../productCard';
import { Crumbs } from '../breadCrumbs/Crumbs';
import { Reload } from '../reload/Reload';

export const Phones: React.FC = () => {
  const {
    phonesTotalNumber,
    itemsPerPage,
    activePage,
    products,
    phones,
    isLoadingPhones,
    selectedOption,
    handleChangeItems,
    handleChangeSort,
    handlePageChange,
    loadingErr,
  } = useContext(ContextApp);

  const sortedPhones = sortBy(products, phones, selectedOption);

  const pagesTotalNumber = useMemo(() => {
    if (itemsPerPage === 'all') {
      return 1;
    }
    return Math.ceil(phonesTotalNumber / +itemsPerPage);
  }, [phonesTotalNumber, itemsPerPage]);

  const startFromElement = +itemsPerPage * activePage - +itemsPerPage;
  const endOnElement = Math.min(+itemsPerPage * activePage, phonesTotalNumber);

  const phonesOnPage =
    itemsPerPage === 'all'
      ? sortedPhones
      : sortedPhones.slice(startFromElement, endOnElement);

  return (
    <div className={Styles['phones']}>
      {isLoadingPhones && <Skeleton />}

      {!isLoadingPhones && loadingErr && <Reload />}

      {!isLoadingPhones && !loadingErr && phonesTotalNumber === 0 && (
        <p className={Styles.tablets__no_item}>There are no tablets yet</p>
      )}

      {!isLoadingPhones && (
        <>
          <Crumbs path={['phones']} />

          <div className={Styles['phones__head']}>
            <h1 className={Styles['phones__head__title']}>Mobile phones</h1>
            <p className={Styles['phones__head__paragraph']}>
              {phonesTotalNumber} models
            </p>
          </div>
          <div className={Styles['phones__filters']}>
            <div className={Styles['phones__filters__sort']}>
              <p className={Styles['phones__filters__sort__paragraph']}>
                Sort by
              </p>

              <select
                className={Styles['phones__filters__sort__select']}
                value={selectedOption}
                onChange={handleChangeSort}
              >
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className={Styles['phones__filters__items']}>
              <p className={Styles['phones__filters__items__paragraph']}>
                Items on page
              </p>

              <select
                className={Styles['phones__filters__items__select']}
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

          <div className={Styles['phones__container']}>
            {phonesOnPage.map(phone => {
              return (
                <ProductCard
                  style={{
                    transform: `translateX(0px)`,
                    transition: 'transform 0s ease-in-out',
                  }}
                  key={phone.id}
                  type={'phones'}
                  product={phone}
                />
              );
            })}
          </div>

          <div className={Styles['phones__choose_page']}>
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
