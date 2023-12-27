import {
  Link,
  useSearchParams,
} from 'react-router-dom';

import { TyChangeEvtSelectElmt } from '../../types/General';
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

enum SortBy {
  age = 'year',
  name = 'name',
  price = 'price',
}

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

  function setSearchWith(params: SearchParams) {
    setSearchParams(getSearchWith(searchParams, params));
  }

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

  const handleSortChange = (event: TyChangeEvtSelectElmt) => {
    setSearchWith({
      [SearchParamsName.SORT]: event.target.value || null,
      [SearchParamsName.PAGE]: '1',
    });
  };

  const handleItemsPerPageChange = (event: TyChangeEvtSelectElmt): void => {
    setSearchWith({
      [SearchParamsName.ITEM_PER_PAGE]: event.target.value || null,
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
              <select
                id="sortOrder"
                value={sortBy}
                onChange={handleSortChange}
                className="
            ProductCategoryPage__selection__select
            ProductCategoryPage__selection__select--order"
              >
                <option value={SortBy.age}>Newest</option>
                <option value={SortBy.name}>Alphabetically</option>
                <option value={SortBy.price}>Cheapest</option>
              </select>
            </div>

            <div className="ProductCategoryPage__selection">
              <label
                htmlFor="itemsPerPage"
                className="ProductCategoryPage__selection__lable"
              >
                Items Per Page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="
            ProductCategoryPage__selection__select
            ProductCategoryPage__selection__select--item-per-page"
              >
                <option value="">All</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
              </select>
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
