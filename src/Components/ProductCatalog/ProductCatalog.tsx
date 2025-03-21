import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import styles from './ProductCatalog.module.scss';
import { home, arrowRight, arrowLeft } from '../../icons';
import { ProductWithYear } from '../../types/product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CustomDropdown } from '../CustomDropdown';
import { useEffect, useMemo, useState } from 'react';
import {
  ItemsPerPageType,
  setItemsPerPage,
  setSortBy,
  SortBy,
} from '../features/catalog';
import { ProductDetailsPage } from '../ProductDetailsPage/ProductDetailsPage';
import classNames from 'classnames';

type Props = {
  title: string;
  items: ProductWithYear[];
};

export const ProductCatalog: React.FC<Props> = ({ title, items }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const path = location.pathname.split('/')[1];
  const capitalizedPath = path.charAt(0).toUpperCase() + path.slice(1);
  const { sortBy, itemsPerPage } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  const defaultPerPage = 'All';

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return itemsPerPage === 'All'
      ? 1
      : Math.ceil(items.length / (itemsPerPage as number));
  }, [items, itemsPerPage]);

  useEffect(() => {
    const sortParam = searchParams.get('sort');

    window.scrollTo(0, 0);

    if (sortParam && Object.values(SortBy).includes(sortParam as SortBy)) {
      dispatch(setSortBy(sortParam as SortBy));
    } else {
      dispatch(setSortBy(SortBy.Newest));
    }

    const perPageParam = searchParams.get('perPage');
    const allowedValues = ['all', '4', '8', '16'];

    if (perPageParam && allowedValues.includes(perPageParam)) {
      const perPageValue =
        perPageParam === 'all' ? 'All' : Number(perPageParam);

      dispatch(setItemsPerPage(perPageValue as ItemsPerPageType));
    } else {
      dispatch(setItemsPerPage(defaultPerPage));
    }
  }, [dispatch, searchParams, path]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (sortBy !== SortBy.Newest) {
      params.set('sort', `${sortBy}`);
    } else {
      params.delete('sort');
    }

    if (itemsPerPage !== defaultPerPage) {
      params.set('perPage', `${itemsPerPage}`);
    } else {
      params.delete('perPage');
    }

    setSearchParams(params);
  }, [sortBy, itemsPerPage, currentPage, setSearchParams, searchParams, path]);

  const sortedItems = useMemo(() => {
    const itemsCopy = [...items];

    switch (sortBy) {
      case SortBy.Newest:
        return itemsCopy.sort((a, b) => b.year - a.year);
      case SortBy.Alphabetically:
        return itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case SortBy.Cheapest:
        return itemsCopy.sort((a, b) => a.priceDiscount - b.priceDiscount);
      default:
        return itemsCopy;
    }
  }, [items, sortBy]);

  const paginatedItems = useMemo(() => {
    if (itemsPerPage === 'All') {
      return sortedItems;
    }

    const start = (currentPage - 1) * (itemsPerPage as number);

    return sortedItems.slice(start, start + (itemsPerPage as number));
  }, [sortedItems, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const newPage = page;

    const params = new URLSearchParams(searchParams);

    params.set('page', `${newPage}`);
    setSearchParams(params);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;

      const params = new URLSearchParams(searchParams);

      params.set('page', `${newPage}`);
      setSearchParams(params);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;

      const params = new URLSearchParams(searchParams);

      params.set('page', `${newPage}`);
      setSearchParams(params);
    }
  };

  function getPaginationClass(index: number) {
    return classNames(styles.singleNumber, {
      [styles.activePage]: currentPage === index + 1,
    });
  }

  function getPaginationTransform() {
    if (currentPage === 1) {
      return `translateX(0px)`;
    }

    const maxOffset = 40 * totalPages;
    const offset = (currentPage - 2) * 40;

    return `translateX(-${Math.min(offset, maxOffset - 152 - 8)}px)`;
  }

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const pageNumber = Number(pageParam);

    if (isNaN(pageNumber) || pageNumber <= 1 || pageNumber > totalPages) {
      const params = new URLSearchParams(searchParams);

      params.delete('page');
      setSearchParams(params);

      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  }, [
    searchParams,
    totalPages,
    setSearchParams,
    currentPage,
    itemsPerPage,
    path,
  ]);

  return (
    <section className={styles.marginContainer}>
      <div className={styles.navContainer}>
        <NavLink to="/">
          <img src={home} alt="home-icon" className={styles.homeIcon} />
        </NavLink>
        <img src={arrowRight} alt="arrow-right" className={styles.arrowIcon} />
        <p className={styles.location}>{capitalizedPath}</p>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.number}>{items.length} models</p>

      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownSortBy}>
          <CustomDropdown label="Sort by" type="sortBy" />
        </div>
        <div className={styles.dropdownPagination}>
          <CustomDropdown label="Items on page" type="itemsPerPage" />
        </div>
      </div>

      <div className={styles.productList}>
        {paginatedItems.map(product => (
          <ProductDetailsPage
            key={product.id}
            offset={0}
            item={product}
            discount={product.priceRegular}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationControls}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={styles.arrows}
          >
            <img src={arrowLeft} alt="icon-arrow-left" />
          </button>
          <div
            className={styles.pageNumbersContainer}
            style={{ justifyContent: totalPages < 4 ? 'center' : 'flex-start' }}
          >
            <div
              className={styles.pageNumbers}
              style={{
                transform: getPaginationTransform(),
              }}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => goToPage(index + 1)}
                  className={getPaginationClass(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={styles.arrows}
          >
            <img src={arrowRight} alt="icon-arrow-left" />
          </button>
        </div>
      )}
    </section>
  );
};
