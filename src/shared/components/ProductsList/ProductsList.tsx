import { Product } from '@/types/Product';
import styles from './ProductsList.module.scss';
import { Dropdown } from '@/shared/components/Dropdown';
import { SortFields } from '@/types/SortFields';
import { DropdownOption } from '@/types/DropdownOptions';
import { ItemsPerPageFields } from '@/types/ItemsPerPageFields';
import { ProductCard } from '@/shared/components/ProductCard';
import { IconButton } from '@/shared/components/IconButton';
import classNames from 'classnames';
import { useProductsPagination } from './hooks/useProductsPagination';

interface Props {
  products: Product[];
  hasFilters?: boolean;
}

const SORT_OPTIONS: DropdownOption[] = [
  { label: 'Newest', value: SortFields.Newest },
  { label: 'Alphabet', value: SortFields.Alphabet },
  { label: 'Cheapest', value: SortFields.Cheapest },
];

const ITEMS_PER_PAGE_OPTIONS: DropdownOption[] = [
  { label: '4', value: ItemsPerPageFields.Field4 },
  { label: '8', value: ItemsPerPageFields.Field8 },
  { label: '16', value: ItemsPerPageFields.Field16 },
  { label: 'All', value: ItemsPerPageFields.All },
];

export const ProductsList = ({ products, hasFilters = true }: Props) => {
  const {
    sort,
    perPage,
    slicedProducts,
    totalPages,
    slicedPages,
    page,
    updateSearchParams,
    handleSetPage,
    handlePrevPage,
    handleNextPage,
  } = useProductsPagination(products);

  return (
    <section className={styles.productsList}>
      {hasFilters && (
        <div className={styles.controls}>
          <Dropdown
            description={'Sort by'}
            options={SORT_OPTIONS}
            value={sort}
            onChange={selectedValue =>
              updateSearchParams('sort', selectedValue)
            }
            className={classNames(styles.dropdown, styles.sortBy)}
          />
          <Dropdown
            description={'Items on page'}
            options={ITEMS_PER_PAGE_OPTIONS}
            value={perPage}
            onChange={selectedValue =>
              updateSearchParams('perPage', selectedValue)
            }
            className={classNames(styles.dropdown, styles.itemsPerPage)}
          />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.list}>
          {slicedProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              category={product.category}
              itemId={product.itemId}
              imgURL={product.image}
              title={product.name}
              price={product.price}
              fullPrice={product.fullPrice}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
            />
          ))}
        </div>

        {totalPages !== 1 && (
          <div className={styles.pagination}>
            <IconButton
              variant="arrow"
              rotate={270}
              onClick={handlePrevPage}
              disabled={page === 1}
            />

            <div className={styles.pages}>
              {slicedPages.map(pageNumber => (
                <IconButton
                  key={pageNumber}
                  variant="pagination"
                  number={pageNumber}
                  selected={page === pageNumber}
                  onClick={() => handleSetPage(pageNumber)}
                />
              ))}
            </div>

            <IconButton
              variant="arrow"
              rotate={90}
              onClick={handleNextPage}
              disabled={page === totalPages}
            />
          </div>
        )}
      </div>
    </section>
  );
};
