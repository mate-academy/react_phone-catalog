import { useCallback } from 'react';
import {
  Link,
  useSearchParams,
} from 'react-router-dom';

import { Product } from '../../types/Product';

import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { NoResults } from '../../components/NoResults';
import {
  SearchParams,
  SearchParamsName,
  getSearchWith,
} from '../../helpers/searchHelper';

import './ProductCategoryPage.scss';
import { Dropdown, TyDropdownOption } from '../../components/Dropdown';

enum SortBy {
  age = 'year',
  name = 'name',
  price = 'price',
}

const sortByOptions: TyDropdownOption[]
= [[SortBy.age, 'Newest'],
  [SortBy.name, 'Alphabetically'],
  [SortBy.price, 'Cheapest']]
  .map(item => ({
    value: item[0],
    content: item[1],
  }));

const itemsPerPageOptions: TyDropdownOption[]
= [['', 'All'],
  ['4', '4'],
  ['8', '8'],
  ['16', '16']]
  .map(item => ({
    value: item[0],
    content: item[1],
  }));

type Props = {
  pageTitle: string;
  linkTitle: string;
  products: Product[];
};

export const ProductCategoryPage: React.FC<Props> = ({
  pageTitle,
  linkTitle,
  products,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = searchParams.get(SearchParamsName.ITEM_PER_PAGE) || '';
  const query = searchParams.get(SearchParamsName.QUERY) || '';
  const sortBy = searchParams.get(SearchParamsName.SORT) || SortBy.age;
  const crntPage = searchParams.get(SearchParamsName.PAGE);
  const crntPageNorm = crntPage ? Math.floor(+crntPage) : 1;

  const setSearchWith = useCallback((params: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, params));
  }, [setSearchParams, searchParams]);

  const preparedQuery = query.trim().toLowerCase();
  const visibleProducts = [...products]
    .filter(p => p.name.toLowerCase().includes(preparedQuery))
    .sort((a, b) => {
      switch (sortBy) {
        case SortBy.age:
          return (a[sortBy] - b[sortBy]) * (-1);

        case SortBy.price:
          return (a[sortBy] - b[sortBy]);

        case SortBy.name:
          return a.name.localeCompare(b.name);

        default:
          return 0;
      }
    });

  const itemNumberStart = itemsPerPage
    ? (+itemsPerPage * (crntPageNorm - 1) + 1)
    : 0;

  const itemNumberEnd = itemsPerPage
    ? Math.min(+itemsPerPage * crntPageNorm, visibleProducts.length)
    : visibleProducts.length;

  const handlePageChange = (page: number): void => {
    if (!itemsPerPage) {
      setSearchWith({ [SearchParamsName.PAGE]: null });

      return;
    }

    setSearchWith({ [SearchParamsName.PAGE]: page.toString() });
  };

  const handleSortChange = (value: string) => {
    setSearchWith({
      [SearchParamsName.SORT]: value || null,
      [SearchParamsName.PAGE]: '1',
    });
  };

  const handleItemsPerPageChange = (value: string): void => {
    setSearchWith({
      [SearchParamsName.ITEM_PER_PAGE]: value || null,
      [SearchParamsName.PAGE]: '1',
    });
  };

  return (
    <div
      data-cy="productList"
      className="ProductCategoryPage
      ProductCategoryPage__container
      page__container"
    >
      <div className="ProductCategoryPage__top">
        <Link to="/" className="ProductCategoryPage__link icon--home" />
        <i className="ProductCategoryPage__icon icon--arrow-right" />
        <p className="ProductCategoryPage__link__title">{linkTitle}</p>
      </div>

      <h1 className="ProductCategoryPage__title">{pageTitle}</h1>
      <p className="ProductCategoryPage__info">{`${products.length} models`}</p>

      {visibleProducts.length ? (
        <>
          <div className="ProductCategoryPage__selections">
            <div className="ProductCategoryPage__selection">
              <label
                htmlFor="sortOrder"
                className="ProductCategoryPage__selection__lable"
              >
                Sort Order:
              </label>

              <div className="
            ProductCategoryPage__selection__dropdown--order"
              >
                <Dropdown
                  selectedValue={sortBy}
                  options={sortByOptions}
                  onChange={handleSortChange}
                />
              </div>
            </div>

            <div className="ProductCategoryPage__selection">
              <label
                htmlFor="itemsPerPage"
                className="ProductCategoryPage__selection__lable"
              >
                Items Per Page:
              </label>

              <div className="
            ProductCategoryPage__selection__dropdown--item-per-page"
              >
                <Dropdown
                  selectedValue={itemsPerPage}
                  options={itemsPerPageOptions}
                  onChange={handleItemsPerPageChange}
                />
              </div>
            </div>
          </div>

          <div className="ProductCategoryPage__grid">
            {
              visibleProducts
                .slice(itemNumberStart, itemNumberEnd + 1)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </div>
        </>
      ) : (
        <div className="ProductCategoryPage__error">
          <NoResults title={`${pageTitle} not found`} />
        </div>
      )}

      {(visibleProducts.length > 0
        && visibleProducts.length > +itemsPerPage
        && +itemsPerPage > 0
      )
        && (
          <div className="ProductCategoryPage__pagination">
            <Pagination
              total={visibleProducts.length}
              perPage={+itemsPerPage}
              crntPage={crntPageNorm}
              onPageChange={handlePageChange}
            />
          </div>
        )}
    </div>
  );
};
