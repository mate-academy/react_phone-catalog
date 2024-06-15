import { useContext, useMemo, useState } from 'react';
import { ContextApp } from '../../appContext/AppContext';
import style from './Tablets.module.scss';
import { Pagination } from '../../pagination';
import { sortBy } from '../../functions/sortBy';
import { SortBy } from '../../types/SortBy';
import { Skeleton } from '../../skeletons/Skelton.tsx';
import { ProductCard } from '../productCard';


export const Tablets: React.FC = () => {
  const { tabletsTotalNumber, isLoadingTablets, tablets, products } =
    useContext(ContextApp);
  const [selectedOption, setSortBy] = useState<SortBy>('newest');
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [activePage, setActivePage] = useState(1);

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
    <div className={style['tablets']}>
      {isLoadingTablets && <Skeleton />}
      {!isLoadingTablets && (
        <>
          <div className={style['tablets__head']}>
            <h1 className={style['tablets__head__title']}>Tablets</h1>
            <p className={style['tablets__head__paragraph']}>
              {tabletsTotalNumber} models
            </p>
          </div>
          <div className={style['tablets__filters']}>
            <div className={style['tablets__filters__sort']}>
              <p className={style['tablets__filters__sort__paragraph']}>
                Sort by
              </p>

              <select
                className={style['tablets__filters__sort__select']}
                value={selectedOption}
                onChange={handleChangeSort}
              >
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className={style['tablets__filters__items']}>
              <p className={style['tablets__filters__items__paragraph']}>
                Items on page
              </p>

              <select
                className={style['tablets__filters__items__select']}
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
          <div className={style['tablets__container']}>
            {tabletsOnPage.map(phone => {
              return <ProductCard key={phone.id} type={'tablets'} product={phone} />;
            })}
          </div>
          <div className={style['tablets__choose_page']}>
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
