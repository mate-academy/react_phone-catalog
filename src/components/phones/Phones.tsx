import { useContext, useMemo, useState } from 'react';
import { ContextApp } from '../../appContext/AppContext';
import style from './Phones.module.scss';
import { Pagination } from '../../pagination';
import { sortBy } from '../../functions/sortBy';
import { SortBy } from '../../types/SortBy';
import { Skeleton } from '../../skeletons/Skelton.tsx';
import { ProductCard } from '../productCard';

export const Phones: React.FC = () => {
  const { phonesTotalNumber, products, phones, isLoadingPhones } =
    useContext(ContextApp);
  const [selectedOption, setSelectedOption] = useState<SortBy>('newest');
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [activePage, setActivePage] = useState(1);

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

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as SortBy);
  };

  const handleChangeItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(e.target.value);
    setActivePage(1);
  };

  const handlePageChange = (number: number) => {
    setActivePage(number);
  };

  return (
    <div className={style['phones']}>
      {isLoadingPhones && <Skeleton />}

      {!isLoadingPhones && (
        <>
          <div className={style['phones__head']}>
            <h1 className={style['phones__head__title']}>Mobile phones</h1>
            <p className={style['phones__head__paragraph']}>
              {phonesTotalNumber} models
            </p>
          </div>
          <div className={style['phones__filters']}>
            <div className={style['phones__filters__sort']}>
              <p className={style['phones__filters__sort__paragraph']}>
                Sort by
              </p>

              <select
                className={style['phones__filters__sort__select']}
                value={selectedOption}
                onChange={handleChangeSort}
              >
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className={style['phones__filters__items']}>
              <p className={style['phones__filters__items__paragraph']}>
                Items on page
              </p>

              <select
                className={style['phones__filters__items__select']}
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
          <div className={style['phones__container']}>
            {phonesOnPage.map(phone => {
              return <ProductCard key={phone.id} type={'phones'} product={phone} />;
            })}
          </div>
          <div className={style['phones__choose_page']}>
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
