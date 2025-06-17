import React, { useEffect } from 'react';
import { ItemsOnPageOptions } from '../../types/ItemsOnPageOptions';
import { Product } from '../../types/Product';
import { ProductsCategory } from '../../types/ProductsCategory';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useValues } from '../../store/ProductContext';
import { SortOptions } from '../../types/SortOptions';
import { Loader } from '../Loader';
import classNames from 'classnames';
import arrowDown from '/img/arrow-down.png';
import arrowUp from '/img/arrow-up.png';

import { Card } from '../Card';
import { Pagination } from '../Pagination/Pagination';
import { SelectionDropdown } from '../SelectionDropdown/SelectionDropdown';
import styles from './ProductsList.module.scss';

const getPreparedProducts = (
  productsArray: Product[],
  productsOnPage: string,
  currentPage: number,
) => {
  let preparedProducts = [...productsArray];
  const firstProduct = (currentPage - 1) * +productsOnPage;
  let lastProduct = currentPage * +productsOnPage;

  if (lastProduct > productsArray.length) {
    lastProduct = productsArray.length;
  }

  if (productsOnPage !== ItemsOnPageOptions.ALL) {
    preparedProducts = preparedProducts.slice(firstProduct, lastProduct);
  }

  return { preparedProducts };
};

type Props = {
  productsCategory: ProductsCategory;
};

const CATEGORY_TITLES: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductsList: React.FC<Props> = ({ productsCategory }) => {
  const DEFAULT_PAGE = 1;

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { sortedProduct, products, isLoading, isError, loadProducts } =
    useValues();
  const sort = searchParams.get('sort' as SortOptions) || SortOptions.NEWEST;
  const itemsOnPage =
    searchParams.get('itemsOnPage' as ItemsOnPageOptions) ||
    ItemsOnPageOptions.ALL;
  const currentPage = searchParams.get('page') || DEFAULT_PAGE;

  const { preparedProducts } = getPreparedProducts(
    sortedProduct,
    itemsOnPage,
    +currentPage,
  );

  const productsTitle = CATEGORY_TITLES[location.pathname.split('/')[1]] || '';

  const [sortOpen, setSortOpen] = React.useState(false);
  const [itemsOpen, setItemsOpen] = React.useState(false);

  const sortOptions = [
    { value: SortOptions.NEWEST, label: 'Newest' },
    { value: SortOptions.ALPABETICALLY, label: 'Alphabetically' },
    { value: SortOptions.CHEAPEST, label: 'Cheapest' },
  ];
  const itemsOptions = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: ItemsOnPageOptions.ALL, label: 'All' },
  ];

  const currentSort = sortOptions.find(opt => opt.value === sort)?.label || sortOptions[0].label;
  const currentItems = itemsOptions.find(opt => opt.value === itemsOnPage)?.label || itemsOptions[3].label;

  const handleChangeSortOption = (sortField: string) => {
    if (sortField === SortOptions.NEWEST) {
      return { sort: null };
    } else if (sort !== sortField) {
      return { sort: sortField };
    }

    return { sort: null };
  };

  const handleChangeItemsOnPageOption = (field: string) => {
    if (field === ItemsOnPageOptions.ALL) {
      return { page: null, itemsOnPage: null };
    }

    return { page: DEFAULT_PAGE, itemsOnPage: field };
  };

  const handleChangePage = (newPage: number) => {
    return { page: newPage };
  };

  useEffect(() => {
    loadProducts(productsCategory);
  }, [loadProducts, productsCategory]);

  const isMobile = window.innerWidth < 640;

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !isError && (
        <div className={styles.products__container}>
          <div className={styles.category_info}>
            <h1 className={styles.category_info__title}>{productsTitle}</h1>
            <p className={styles.category_info__description}>
              {products.length} models
            </p>
          </div>
          <div className={styles.products__options}>
            <div className={styles.dropdownBlock}>
              <span className={styles.dropdownLabel}>Sort by</span>
              <div
                className={styles.dropdown}
                tabIndex={0}
                onClick={() => setSortOpen(o => !o)}
                onBlur={() => setSortOpen(false)}
              >
                <span className={styles.dropdownValue}>{currentSort}</span>
                <img src={sortOpen ? arrowUp : arrowDown} alt="arrow" className={styles.dropdownIcon} />
                {sortOpen && (
                  <div className={styles.dropdownList}>
                    {sortOptions.map(opt => (
                      <div
                        key={opt.value}
                        className={styles.dropdownOption + (sort === opt.value ? ' active' : '')}
                        onMouseDown={() => {
                          setSearchParams({ sort: opt.value });
                          setSortOpen(false);
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.dropdownBlock}>
              <span className={styles.dropdownLabel}>Items on page</span>
              <div
                className={styles.dropdown}
                tabIndex={0}
                onClick={() => setItemsOpen(o => !o)}
                onBlur={() => setItemsOpen(false)}
              >
                <span className={styles.dropdownValue}>{currentItems}</span>
                <img src={itemsOpen ? arrowUp : arrowDown} alt="arrow" className={styles.dropdownIcon} />
                {itemsOpen && (
                  <div className={styles.dropdownList}>
                    {itemsOptions.map(opt => (
                      <div
                        key={opt.value}
                        className={styles.dropdownOption + (itemsOnPage === opt.value ? ' active' : '')}
                        onMouseDown={() => {
                          setSearchParams({ sort, itemsOnPage: opt.value });
                          setItemsOpen(false);
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.products__list__cards}>
            {preparedProducts.map(product => (
              <div className={styles.products__list__card} key={product.id}>
                <Card product={product} />
              </div>
            ))}
          </div>

          {itemsOnPage !== ItemsOnPageOptions.ALL && (
            <Pagination
              currentPage={+currentPage}
              itemsOnPage={+itemsOnPage}
              totalItems={products.length}
              onChange={handleChangePage}
            />
          )}
        </div>
      )}
    </>
  );
}; 