import { useContext, useMemo, useState } from 'react';
import { ContextApp } from '../../appContext/AppContext';
import style from './Accessories.module.scss';
import { Pagination } from '../../pagination';
import { SortBy } from '../../types/SortBy';
import { sortBy } from '../../functions/sortBy';
import { Skeleton } from '../../skeletons/Skelton.tsx';
import { ProductCard } from '../productCard';

export const Accessories: React.FC = () => {
  const {
    accessoriesTotalNumber,
    isLoadingAccessories,
    accessories,
    products,
  } = useContext(ContextApp);
  const [selectedOption, setSortBy] = useState<SortBy>('newest');
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [activePage, setActivePage] = useState(1);

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

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortBy);
  };

  const handleChangeItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(e.target.value);
    setActivePage(1);
  };

  const handlePageChange = (number: number) => {
    setActivePage(number);
  };

  return (
    <div className={style['accessories']}>
      {isLoadingAccessories && <Skeleton />}

      {!isLoadingAccessories && (
        <>
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
              return <ProductCard type={'accessories'} key={accessory.id} product={accessory} />;
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
