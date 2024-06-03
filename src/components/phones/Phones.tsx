import { useContext, useMemo, useState } from 'react';
import { ContextApp } from '../../appContext/AppContext';
import { PhoneCard } from './productCard';
import style from './Phones.module.scss';
import { Pagination } from '../../pagination';

export const Phones: React.FC = () => {
  const { phonesTotalNumber, phones } = useContext(ContextApp);
  const [selectedOption, setSortBy] = useState('Newest');
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [activePage, setActivePage] = useState(1);

  const pagesTotalNumber = useMemo(() => {
    if (itemsPerPage === 'all') {
      return 1;
    }
    return Math.ceil(phonesTotalNumber / +itemsPerPage);
  }, [phonesTotalNumber, itemsPerPage]);

  const startFromElement = +itemsPerPage * activePage - +itemsPerPage;
  const endOnElement = Math.min(+itemsPerPage * activePage, phonesTotalNumber);

  console.log('activePage z phones', activePage);
  console.log('startFromElement', startFromElement);
  console.log('endOnElement', endOnElement);

  const phonesOnPage =
    itemsPerPage === 'all'
      ? phones
      : phones.slice(startFromElement, endOnElement);

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
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
      <div className={style['phones__head']}>
        <h1 className={style['phones__head__title']}>Mobile phones</h1>
        <p className={style['phones__head__paragraph']}>
          {phonesTotalNumber} models
        </p>
      </div>

      <div className={style['phones__filters']}>
        <div className={style['phones__filters__sort']}>
          <p className={style['phones__filters__sort__paragraph']}>Sort by</p>

          <select
            className={style['phones__filters__sort__select']}
            value={selectedOption}
            onChange={handleChangeSort}
          >
            <option value="Newest">Newest</option>
            <option value="Alphabetically">Alphabetically</option>
            <option value="Cheapest">Cheapest</option>
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
          return <PhoneCard key={phone.id} product={phone} />;
        })}
      </div>

      <div className={style['phones__choose_page']}>
        <Pagination
          pagesTotalNumber={pagesTotalNumber}
          activePage={activePage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
