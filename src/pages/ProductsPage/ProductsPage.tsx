import { Select } from '@base-ui-components/react/select';
import classNames from 'classnames';
import { useEffect, useRef, useState, type FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductsListSection } from '../../components/Sections/ProductsListSection';
import { ITEMS_ON_PAGE_OPTIONS } from '../../constants/itemsOnPageOptions';
import { SORT_BY_OPTIONS } from '../../constants/sortByOptions';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import { useCatalogProducts } from '../../hooks/useCatalogProducts';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { NotFoundPage } from '../NotFoundPage';
import styles from './ProductsPage.module.scss';
import IconArrowDown from '/icons/arrow_down.svg';

export const ProductsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { urlSort, urlPage, urlPerPage, updateParams } = useCatalogParams();
  const { products, isLoading } = useFetchProducts();

  const [sortBy, setSortBy] = useState(urlSort);
  const [currentPage, setCurrentPage] = useState(urlPage);
  const [itemsOnPage, setItemsOnPage] = useState<string | number>(urlPerPage);
  const { category } = useParams<{ category: string }>();
  const listRef = useRef<HTMLDivElement>(null);

  const {
    isValidCategory,
    pageTitle,
    productsFromServer,
    visibleItems,
    pageCount,
    isAll,
  } = useCatalogProducts(products, category, sortBy, currentPage, itemsOnPage);

  useEffect(() => {
    if (isValidCategory) {
      updateParams(sortBy, currentPage, itemsOnPage);
    }
  }, [sortBy, currentPage, itemsOnPage, updateParams, isValidCategory]);

  useEffect(() => {
    if (currentPage > pageCount && pageCount > 0) {
      setCurrentPage(pageCount);
    }
  }, [pageCount, currentPage]);

  useEffect(() => {
    if (!isValidCategory && searchParams.size > 0) {
      setSearchParams({});
    }
  }, [isValidCategory, searchParams, setSearchParams]);

  if (!isValidCategory) {
    return <NotFoundPage />;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <h1 className={styles.title}>{pageTitle}</h1>
      <div className={styles.count}>{productsFromServer.length} models</div>
      <div
        ref={listRef}
        className={styles.selects}
      >
        <div className={classNames(styles.selectWrapper, styles.sortBy)}>
          <Select.Root
            items={SORT_BY_OPTIONS}
            value={sortBy}
            onValueChange={(event) => setSortBy(event)}
          >
            <label className={styles.selectLabel}>Sort By</label>
            <Select.Trigger className={styles.select}>
              <Select.Value />
              <Select.Icon className={styles.selectIcon}>
                <img
                  src={IconArrowDown}
                  alt="icon arrow down"
                />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner
                alignItemWithTrigger={false}
                className={styles.Positioner}
              >
                <Select.Popup className={styles.popup}>
                  {SORT_BY_OPTIONS.map(({ label, value }) => (
                    <Select.Item
                      key={label}
                      value={value}
                      className={styles.item}
                    >
                      <Select.ItemText className={styles.itemText}>
                        {label}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>

        <div className={styles.selectWrapper}>
          <Select.Root
            items={ITEMS_ON_PAGE_OPTIONS}
            value={itemsOnPage}
            onValueChange={(items) =>
              setItemsOnPage(items === 'all' ? 'all' : +items)
            }
          >
            <label className={styles.selectLabel}>Items on page</label>
            <Select.Trigger className={styles.select}>
              <Select.Value />
              <Select.Icon className={styles.selectIcon}>
                <img
                  src={IconArrowDown}
                  alt="icon arrow down"
                />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner alignItemWithTrigger={false}>
                <Select.Popup className={styles.popup}>
                  {ITEMS_ON_PAGE_OPTIONS.map(({ label, value }) => (
                    <Select.Item
                      key={label}
                      value={value}
                      className={styles.item}
                    >
                      <Select.ItemText className={styles.itemText}>
                        {label}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
      <ProductsListSection
        isLoading={isLoading}
        productsFromServer={visibleItems}
        itemsOnPage={itemsOnPage}
      />
      {!isAll && (
        <Pagination
          totalPages={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
