import { memo } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { useProducts } from '../../../shared/context/productsContext';
import { useSearchParams } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = memo(() => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || null;
  const activePage = searchParams.get('page') || 1;

  const getPages = (): number[] => {
    if (perPage) {
      const amount = Math.ceil(products.length / +perPage);

      return [...Array(amount)].map((_, i) => i + 1);
    }

    return [1];
  };

  const pages = getPages();

  const handleActivePage = (page: number) => {
    if (page === 1) {
      searchParams.delete('page');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const MoreThenFivePages = () => {
    if (+activePage > 3 && +activePage !== pages[pages.length - 1]) {
      return (
        <>
          <button
            type="button"
            onClick={() => handleActivePage(1)}
            className={classNames(styles.pagination__item, {
              [styles.pagination__item_active]: 1 === +activePage,
            })}
          >
            1
          </button>

          <button type="button" className={styles.pagination__item}>
            ...
          </button>

          <button
            type="button"
            className={classNames(styles.pagination__item, {
              [styles.pagination__item_active]: +activePage,
            })}
          >
            {activePage}
          </button>

          <button type="button" className={styles.pagination__item}>
            ...
          </button>
        </>
      );
    } else {
      return (
        <>
          {pages.slice(0, 3).map(item => (
            <button
              key={item}
              type="button"
              onClick={() => handleActivePage(item)}
              className={classNames(styles.pagination__item, {
                [styles.pagination__item_active]: item === +activePage,
              })}
            >
              {item}
            </button>
          ))}

          <button type="button" className={styles.pagination__item}>
            ...
          </button>
        </>
      );
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handleActivePage(activePage === 1 ? 1 : +activePage - 1)}
        disabled={activePage === 1}
        className={classNames(styles.pagination__button)}
      >
        <IoIosArrowBack/>
      </button>
      <div className={styles.pagination__items}>
        {pages.length > 5 ? (
          <>
            <MoreThenFivePages />

            <div
              onClick={() => handleActivePage(pages[pages.length - 1])}
              className={classNames(styles.pagination__item, {
                [styles.pagination__item_active]:
                  pages[pages.length - 1] === +activePage,
              })}
            >
              {pages[pages.length - 1]}
            </div>
          </>
        ) : (
          pages.map(item => (
            <div
              key={item}
              onClick={() => handleActivePage(item)}
              className={classNames(styles.pagination__item, {
                [styles.pagination__item_active]: item === +activePage,
              })}
            >
              {item}
            </div>
          ))
        )}
      </div>
      <button
        onClick={() =>
          handleActivePage(
            activePage === pages[pages.length - 1]
              ? activePage
              : +activePage + 1,
          )
        }
        disabled={+activePage === pages[pages.length - 1]}
        className={classNames(styles.pagination__button)}
      >
        <IoIosArrowForward/>
      </button>
    </div>
  );
});

export default Pagination;

Pagination.displayName = 'Pagination';
