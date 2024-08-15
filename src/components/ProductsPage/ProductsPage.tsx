import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../redux/hooks';
import { selectProducts } from '../../redux/slices/productsSlice';
import { CatalogProduct } from '../../types/CatalogProduct';
import { SortBy } from '../../types/SortBy';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { toCommonPropsProducts } from '../../utils/toCommonPropsProducts';
import { getSortedProducts } from '../../utils/getSortedProducts';
import { ProductsList } from '../ProductsList';
import { Pagination } from '../Pagination';
import styles from './ProductsPage.module.scss';

interface Props {
  label: string;
  products: CatalogProduct[];
  loading: boolean;
  errorMsg: string;
}

function addItemClass(toSelect: string, current: string): string {
  return classNames(styles.dropdownItem, {
    [styles.dropdownItemSelected]: toSelect === current,
  });
}

const sortOptions = Object.keys(SortBy);
const sortParams = Object.values(SortBy) as string[];
const perPageOptions = Object.values(ItemsOnPage) as string[];

const DEFAULT_SORT_OPTION = sortOptions[0];
const DEFAULT_SORT_PARAM = sortParams[0];
const DEFAULT_PER_PAGE = ItemsOnPage.all;

export const ProductsPage: React.FC<Props> = ({
  label,
  products,
  loading,
  errorMsg,
}) => {
  const [sortByExpanded, setSortByExpanded] = useState<boolean>(false);
  const [perPageExpanded, setPerPageExpanded] = useState<boolean>(false);
  const { products: allProducts } = useAppSelector(selectProducts);
  const [searchParams, setSearchParams] = useSearchParams();

  const totalProducts = products.length;
  const title = label === 'Phones' ? 'Mobile phones' : label;

  const sortParam = searchParams.get('sort') || DEFAULT_SORT_PARAM;
  const sortIndex = sortParams.indexOf(sortParam);
  const sortOption =
    sortIndex !== -1 ? sortOptions[sortIndex] : DEFAULT_SORT_OPTION;

  const perPageParam = searchParams.get('perPage') || DEFAULT_PER_PAGE;
  const perPageIndex = perPageOptions.indexOf(perPageParam);
  const perPage =
    perPageIndex !== -1 ? perPageOptions[perPageIndex] : DEFAULT_PER_PAGE;
  const numPerPage = perPage !== ItemsOnPage.all ? +perPage : totalProducts;

  const normalizedPerPage = numPerPage ? numPerPage : 1;
  const pagesTotal = Math.ceil(totalProducts / normalizedPerPage);

  const pageParam = searchParams.get('page');
  const pageNumber = pageParam === null || isNaN(+pageParam) ? 1 : +pageParam;

  const currPage = pageNumber > pagesTotal || pageNumber < 1 ? 1 : pageNumber;

  const startIndex = (currPage - 1) * numPerPage;
  let endIndex = (currPage - 1) * numPerPage + numPerPage;

  if (endIndex > totalProducts) {
    endIndex = totalProducts;
  }

  const sortedProducts = getSortedProducts(products, allProducts, sortOption);
  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  const updateCurrPage = useCallback(
    (pageNum: number): void => {
      const newParams = new URLSearchParams(searchParams);

      if (pageNum === 1) {
        newParams.delete('page');
      } else {
        newParams.set('page', `${pageNum}`);
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handleSortOptionClick = useCallback(
    (index: number): void => {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('sort', sortParams[index]);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handlePerPageOptionClick = useCallback(
    (option: string): void => {
      const newParams = new URLSearchParams(searchParams);

      newParams.delete('page');

      if (option === DEFAULT_PER_PAGE) {
        newParams.delete('perPage');
      } else {
        newParams.set('perPage', option);
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    if (!sortByExpanded) {
      return;
    }

    const handleOutsideClick = () => setSortByExpanded(false);

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [sortByExpanded]);

  useEffect(() => {
    if (!perPageExpanded) {
      return;
    }

    const handleOutsideClick = () => setPerPageExpanded(false);

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [perPageExpanded]);

  return (
    <div className={styles.productsPage}>
      <div className={styles.topLinks}>
        <Link to="/" className={styles.homeLink} />

        <div className={styles.arrowRight} />

        <Link to={`/${label.toLowerCase()}`} className={styles.productsLink}>
          {label}
        </Link>
      </div>

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.itemsTxt}>
        {products.length !== 1 ? `${products.length} models` : '1 model'}
      </p>

      <div className={styles.dropdownBlocks}>
        <div className={styles.sortByDropdown}>
          <p className={styles.dropdownLabel}>Sort by</p>

          <div className={styles.dropdownContent}>
            <button
              type="button"
              className={classNames(styles.dropdownTrigger, {
                [styles.dropdownTriggerActive]: sortByExpanded,
              })}
              onClick={e => {
                e.stopPropagation();
                setSortByExpanded(!sortByExpanded);
              }}
            >
              {sortOption}
            </button>

            <div
              className={classNames(styles.dropdownList, {
                [styles.dropdownListVisible]: sortByExpanded,
              })}
            >
              {sortOptions.map((option, i) => (
                <button
                  key={option}
                  type="button"
                  className={addItemClass(option, sortOption)}
                  onClick={() => handleSortOptionClick(i)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.itemsOnPageDropdown}>
          <p className={styles.dropdownLabel}>Items on page</p>

          <div className={styles.dropdownContent}>
            <button
              type="button"
              className={classNames(styles.dropdownTrigger, {
                [styles.dropdownTriggerActive]: perPageExpanded,
              })}
              onClick={e => {
                e.stopPropagation();
                setPerPageExpanded(!perPageExpanded);
              }}
            >
              {perPage}
            </button>

            <div
              className={classNames(styles.dropdownList, {
                [styles.dropdownListVisible]: perPageExpanded,
              })}
            >
              {perPageOptions.map(option => (
                <button
                  key={option}
                  type="button"
                  className={addItemClass(option, perPage)}
                  onClick={() => handlePerPageOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProductsList
        name={title.toLowerCase()}
        products={toCommonPropsProducts(visibleProducts)}
        perPage={numPerPage}
        loading={loading}
        errorMsg={errorMsg}
      />

      <Pagination
        totalProducts={totalProducts}
        currPage={currPage}
        perPage={numPerPage}
        updateCurrPage={updateCurrPage}
      />
    </div>
  );
};
