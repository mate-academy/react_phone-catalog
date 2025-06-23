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

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  label: string;
  options: DropdownOption[];
  currentValue: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  onBlur: () => void;
};

const CATEGORY_TITLES: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

// Універсальний компонент для dropdown'а
const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  currentValue,
  isOpen,
  onToggle,
  onSelect,
  onBlur,
}) => {
  const currentOption = options.find(opt => opt.value === currentValue)?.label || options[0].label;

  return (
    <div className={styles.dropdownBlock}>
      <span className={styles.dropdownLabel}>{label}</span>
      <div
        className={styles.dropdown}
        tabIndex={0}
        onClick={onToggle}
        onBlur={onBlur}
      >
        <span className={styles.dropdownValue}>{currentOption}</span>
        <img src={isOpen ? arrowUp : arrowDown} alt="arrow" className={styles.dropdownIcon} />
        {isOpen && (
          <div className={styles.dropdownList}>
            {options.map(opt => (
              <div
                key={opt.value}
                className={classNames(styles.dropdownOption, {
                  active: currentValue === opt.value,
                })}
                onMouseDown={() => onSelect(opt.value)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
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
    '16';
  const currentPage = searchParams.get('page') || DEFAULT_PAGE;

  const { preparedProducts } = getPreparedProducts(
    sortedProduct,
    itemsOnPage,
    +currentPage,
  );

  const productsTitle = CATEGORY_TITLES[location.pathname.split('/')[1]] || '';

  const [sortOpen, setSortOpen] = React.useState(false);
  const [itemsOpen, setItemsOpen] = React.useState(false);

  const sortOptions: DropdownOption[] = [
    { value: SortOptions.NEWEST, label: 'Newest' },
    { value: SortOptions.ALPABETICALLY, label: 'Alphabetically' },
    { value: SortOptions.CHEAPEST, label: 'Cheapest' },
  ];
  
  const itemsOptions: DropdownOption[] = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: ItemsOnPageOptions.ALL, label: 'All' },
  ];

  const handleChangePage = (newPage: number) => {
    return { page: newPage };
  };

  const handleSortSelect = (value: string) => {
    setSearchParams({ sort: value });
    setSortOpen(false);
  };

  const handleItemsSelect = (value: string) => {
    setSearchParams({ sort, itemsOnPage: value });
    setItemsOpen(false);
  };

  useEffect(() => {
    loadProducts(productsCategory);
  }, [loadProducts, productsCategory]);

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
            <Dropdown
              label="Sort by"
              options={sortOptions}
              currentValue={sort}
              isOpen={sortOpen}
              onToggle={() => setSortOpen(o => !o)}
              onSelect={handleSortSelect}
              onBlur={() => setSortOpen(false)}
            />
            <Dropdown
              label="Items on page"
              options={itemsOptions}
              currentValue={itemsOnPage}
              isOpen={itemsOpen}
              onToggle={() => setItemsOpen(o => !o)}
              onSelect={handleItemsSelect}
              onBlur={() => setItemsOpen(false)}
            />
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