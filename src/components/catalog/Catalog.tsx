import { FC, useEffect, useMemo, useState } from 'react';

import { ProductList } from '@components/products/products-list/ProductList';
import { Arrows } from '@components/home/banner/slider/arrows/Arrows';
import { Dropdown } from '@ui/dropdown/Dropdown';
import { ArrowRightIcon } from '@ui/icon/ArrowRightIcon';
import { ArrowLeftIcon } from '@ui/icon/ArrowLeftIcon';
import { Breadcrumbs } from '@ui/links/Breadcrumbs';
import { Pagination } from '@ui/pagination/Pagination';

import { useAction } from '@hooks/useActions';
import { getPlural } from '@utils/helpers/getPlural';
import { TProduct } from '@utils/types/product.type';
import { ITEMS_ON_PAGE, SORT_OPTIONS } from '@utils/constants/optionsForSort';

import styles from './catalog.module.scss';

enum SORT_BY {
  properties = 'sortByProperties',
  page = 'sortByPage',
}

type TProps = {
  title: string;
  text: string;
  products: TProduct[];
  dropdown?: boolean;
  pagination?: boolean;
};

export const Catalog: FC<TProps> = ({
  title,
  text,
  products,
  dropdown = false,
  pagination = false,
}) => {
  const { setSortBy } = useAction();
  const [items, setItems] = useState<TProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(8);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    [SORT_BY.properties]: false,
    [SORT_BY.page]: false,
  });

  const plural = getPlural(items.length);

  useEffect(() => {
    setItems(products);
  }, [products]);

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };
  // #region Dropdown Logic
  const toggleDropdown = (type: SORT_BY) => {
    setIsDropdownOpen(prev => {
      const newState = {
        sortByProperties: false,
        sortByPage: false,
      };

      newState[type] = !prev[type];
      return newState;
    });
  };

  const closeDropdown = (type: SORT_BY) => {
    setIsDropdownOpen(prev => ({
      ...prev,
      [type]: false,
    }));
  };
  // #endregion

  // #region Pagination Logic
  const indexOfLastPost = currentPage * itemPerPage;
  const indexOfFirstPost = indexOfLastPost - itemPerPage;
  const currentItems = useMemo(
    () => items.slice(indexOfFirstPost, indexOfLastPost),
    [items, indexOfFirstPost, indexOfLastPost],
  );

  const totalPages = Math.ceil(items.length / itemPerPage);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const isPaginationVisible = pagination && items.length > 0;

  const handlePageChange = (increment: number) => {
    setCurrentPage(prev => Math.min(Math.max(prev + increment, 1), totalPages));
  };
  // #endregion

  return (
    <section className={styles.catalog}>
      <Breadcrumbs text={text} />

      <div className={styles.title}>
        <h1>{title}</h1>

        {!dropdown && !pagination && !items.length ? (
          <span>Your favourites list is empty.</span>
        ) : (
          <span>
            {items.length} {plural}
          </span>
        )}
      </div>

      <div className={styles.wrapper}>
        {dropdown && (
          <div className={styles.dropdowns}>
            <Dropdown
              text="Sort by"
              options={SORT_OPTIONS}
              setSortBy={handleSortChange}
              isDropdownOpen={isDropdownOpen.sortByProperties}
              setIsDropdownOpen={() => toggleDropdown(SORT_BY.properties)}
              closeDropdown={() => closeDropdown(SORT_BY.properties)}
            />
            <Dropdown
              small
              text="Items on page"
              options={ITEMS_ON_PAGE}
              setItemPerPage={setItemPerPage}
              setCurrentPage={setCurrentPage}
              isDropdownOpen={isDropdownOpen.sortByPage}
              setIsDropdownOpen={() => toggleDropdown(SORT_BY.page)}
              closeDropdown={() => closeDropdown(SORT_BY.page)}
            />
          </div>
        )}

        <div className={styles.list}>
          {currentItems.length > 0 &&
            currentItems.map(product => (
              <ProductList key={product.id} product={product} discount />
            ))}
        </div>
      </div>

      {isPaginationVisible && (
        <div className={styles.paginations}>
          <Arrows
            slider={() => handlePageChange(-1)}
            label="Previous page"
            disabled={isPrevDisabled}
          >
            <ArrowLeftIcon />
          </Arrows>

          <Pagination
            length={items.length}
            itemPerPage={itemPerPage}
            currentPage={currentPage}
            handlePagination={setCurrentPage}
          />

          <Arrows
            slider={() => handlePageChange(1)}
            label="Next page"
            disabled={isNextDisabled}
          >
            <ArrowRightIcon />
          </Arrows>
        </div>
      )}
    </section>
  );
};
