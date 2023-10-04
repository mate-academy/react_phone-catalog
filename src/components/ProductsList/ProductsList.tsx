import { FC } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { DropdownMenu } from '../DropdownMenu';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { getVisibleProducts } from '../../helpers/getVisibleProducts';
import { getNumbers } from '../../helpers/getNumbers';
import { Filter } from '../../types/Filter';
import { NoResults } from '../NoResults';
import { Breadcrumbs } from '../Breadcrumbs';
import './ProductsList.scss';

type Props = {
  products: Product[],
  title: string,
};

export const sortOptions = [
  {
    name: 'Newest',
    value: 'age',
  },
  {
    name: 'Alphabetically',
    value: 'name',
  },
  {
    name: 'Cheapest',
    value: 'price',
  },
];

export const itemsPerPageOptions = [
  {
    name: '4',
    value: '4',
  },
  {
    name: '8',
    value: '8',
  },
  {
    name: '16',
    value: '16',
  },
  {
    name: 'All',
    value: 'all',
  },
];

const findFilterName = (value: string, optionsArray: Filter[]) => {
  const result = optionsArray.find(option => option.value === value);

  return result ? result.name : '';
};

export const ProductsList: FC<Props> = ({ products, title }) => {
  const [searchParams] = useSearchParams();
  const selectedSortOption = searchParams.get('sort') || sortOptions[0].value;
  const selectedItemsPerPage = searchParams.get('perPage')
    || itemsPerPageOptions[2].value;
  const currentPage = Number(searchParams.get('page') || '1');

  const total = products.length;
  const pageQty = getNumbers(1, Math.ceil(total / +selectedItemsPerPage));

  const visibleItems = getVisibleProducts(
    products,
    selectedSortOption,
    selectedItemsPerPage,
    currentPage,
  );

  const { pathname } = useLocation();
  const pageName = pathname.split('/').pop();

  const showFilters = ['phones', 'tablets', 'accessories']
    .includes(pageName || '');

  return (
    <section className="products-list__container">
      <Breadcrumbs />
      <div className="products-list__header">
        <h1 className="products-list__title">{title}</h1>
        <span className="products-list__qty">{`${products.length} models`}</span>
      </div>

      {total > 0 ? (
        <>
          {showFilters && (
            <div className="products-list__filters">
              <div className="products-list__drop-down-container">
                <DropdownMenu
                  title="Sort by"
                  options={sortOptions}
                  initialValue={
                    findFilterName(selectedSortOption, sortOptions) || 'Newest'
                  }
                  searchParamsKey="sort"
                />
              </div>

              <div className="products-list__drop-down-container">
                <DropdownMenu
                  title="Items on page"
                  options={itemsPerPageOptions}
                  initialValue={
                    findFilterName(selectedItemsPerPage, itemsPerPageOptions)
                      || '16'
                  }
                  searchParamsKey="perPage"
                />
              </div>
            </div>
          )}

          <div className="products-list__main-content">
            <ul className="grid" data-cy="productList">
              {visibleItems.map((product, index) => (
                <ProductCard product={product} key={product.id} index={index} />
              ))}
            </ul>
          </div>

          {pageQty.length > 1 && (
            <Pagination
              currentPage={currentPage}
              pageQty={pageQty}
            />
          )}
        </>
      ) : (
        <NoResults title={title} />
      )}
    </section>
  );
};
