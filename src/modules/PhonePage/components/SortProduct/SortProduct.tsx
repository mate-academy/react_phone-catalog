import { Link, useSearchParams } from 'react-router-dom';
import styles from './SortProduct.module.scss';
import { useState } from 'react';
import usePageLocation from '../../../shared/hooks/usePageLocation';
import useFilterProducts from '../../../shared/hooks/useFilterProducts';

  type Props = {
  }
export const SortProduct: React.FC<Props> = () => {
  const [isOpenButtonSort, setIsOpenButtonSort] = useState(false);
  const [isOpenButtonPage, setIsOpenButtonPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { pageLocation } = usePageLocation();
  const { filterProduct } = useFilterProducts();

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';

  const chooseSort = (value: string) => {
    switch (value) {
      case 'Newest':
        return 'age';

      case 'Alphabetically':
        return 'title';
  
      case 'Cheapest':
        return 'price';

      default:
        return '';
    };
  };

  const handleFilterProduct = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const params = new URLSearchParams(searchParams);
    const sort = chooseSort(e.currentTarget.innerText);
    params.set('sort', sort);
    setSearchParams(params);
  }

  const getPerpage = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const params = new URLSearchParams(searchParams);
    if(e.currentTarget.innerText === 'All') {
      params.delete('perPage');
    } else {
      params.set('perPage', e.currentTarget.innerText);
    }
  
    setSearchParams(params);
  }

  return (
    <div className={styles.phones__page}>
      <div className={styles.phones__page__location}>
        <Link className={styles.phones__page__home__img} to="/"></Link>
        <span className={styles.phones__page__arrow}></span>
        <span className={styles.phones__page__plase}>{pageLocation}</span>
      </div>
      <h1 className={styles.phones__page__title}>{`${pageLocation} page`}</h1>
      <div className={styles.phones__page__items}>
        {`${filterProduct.length} models`}
      </div>
      <div className={styles.phones__page__search}>
        <div className={styles.search__product}>
          <span className={styles.search__product}>Sort by</span>
          <button
            className={styles.search__by}
            onBlur={() => setIsOpenButtonSort(false)}
            onClick={() => setIsOpenButtonSort(prev => !prev)}
          >
            {sort ? sort : 'Choose option'}

            {isOpenButtonSort
              ? (<i className={`${styles.search__arrow} ${styles.search__down}`}></i>)
              : (<i className={`${styles.search__arrow} ${styles.search__up}`}></i>)}
          </button>
          <ul
            className={styles.search__list}
            style={{ opacity: `${isOpenButtonSort ? 1 : 0}` }}
          >
            <li
              className={styles.search__item}
              onClick={handleFilterProduct}

            >
              <button
                value="age"
                className={styles.search__name}
              >
                Newest
              </button>
            </li>
            <li
              className={styles.search__item}
              onClick={handleFilterProduct}
            >
              <button className={styles.search__name}>Alphabetically</button>
            </li>
            <li
              className={styles.search__item}
              onClick={handleFilterProduct}
            >
              <button className={styles.search__name}>Cheapest</button>
            </li>
          </ul>
        </div>

        <div className={styles.search__product}>
          <span className={styles.search__product}>SItems on page</span>
          <button
            className={styles.search__by}
            onBlur={() => setIsOpenButtonPage(false)}
            onClick={() => setIsOpenButtonPage(prev => !prev)}
          >
            {perPage ? perPage : 'All'}
            {isOpenButtonPage
              ? (<i className={`${styles.search__arrow} ${styles.search__down}`}></i>)
              : (<i className={`${styles.search__arrow} ${styles.search__up}`}></i>)}
          </button>

          <ul
            className={styles.search__list}
            style={{ opacity: `${isOpenButtonPage ? 1 : 0}` }}
          >
            <li
              className={styles.search__item}
              onClick={getPerpage}
            >
              <button className={styles.search__name}>All</button>
            </li>
            <li
              className={styles.search__item}
              onClick={getPerpage}
            >
              <button className={styles.search__name}>4</button>
            </li>
            <li
              className={styles.search__item}
              onClick={getPerpage}
            >
              <button className={styles.search__name}>8</button>
            </li>
            <li
              className={styles.search__item}
              onClick={getPerpage}

            >
              <button className={styles.search__name}>16</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
