import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import styles from './ProductCatalog.module.scss';
import { home, arrowRight, arrowLeft } from '../../icons';
import { ProductWithYear } from '../../types/product';
import { CustomDropdown } from '../CustomDropdown';
import { useEffect, useMemo, useState } from 'react';
import { SortBy } from '../features/catalog';
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

  const sortBy = (searchParams.get('sort') as SortBy) || SortBy.Newest;
  const itemsPerPageParam = searchParams.get('perPage') || 'All';
  const itemsPerPage =
    itemsPerPageParam === 'All' ? 'All' : Number(itemsPerPageParam);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return itemsPerPage === 'All'
      ? 1
      : Math.ceil(items.length / (itemsPerPage as number));
  }, [items, itemsPerPage]);

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
    const params = new URLSearchParams(searchParams);

    params.set('page', `${page}`);
    setSearchParams(params, { replace: false });
  };

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const pageNumber = Number(pageParam);

    if (isNaN(pageNumber) || pageNumber <= 1 || pageNumber > totalPages) {
      const params = new URLSearchParams(searchParams);

      if (params.has('page')) {
        params.delete('page');
        setSearchParams(params, { replace: false });
      }

      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }

    window.scrollTo(0, 0);
  }, [searchParams, setSearchParams, totalPages]);

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
            onClick={() => goToPage(currentPage - 1)}
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
              style={{ transform: getPaginationTransform() }}
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
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.arrows}
          >
            <img src={arrowRight} alt="icon-arrow-right" />
          </button>
        </div>
      )}
    </section>
  );
};
