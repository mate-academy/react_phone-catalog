import { useNavigate, useSearchParams } from 'react-router-dom';
import './ProductsList.scss';
import { ProductCard } from '../ProductCard';
import { SearchParams } from '../../types/SearchParams';
import { SortBy } from '../../types/SortBy';
import React from 'react';
import { Product } from '../../types/Product';
import { PerPage } from '../../types/PerPage';

type Props = {
  products: Product[];
  PER_PAGE?: PerPage;
  DEF_SORT?: SortBy;
  hasError?: boolean;
};

const blankProducts: null[] = new Array(10).fill(null);

export const ProductsList: React.FC<Props> = ({
  products,
  DEF_SORT = SortBy.NEWEST,
  PER_PAGE = PerPage.EIGHT,
  hasError = false,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortedBy = searchParams.get(SearchParams.SORT_BY) ?? DEF_SORT;
  const page = +(searchParams.get(SearchParams.PAGE_NUMBER) ?? 1);
  const perPage = +(searchParams.get(SearchParams.PER_PAGE) ?? PER_PAGE);

  const sortedProducts = products.toSorted((product, nextProduct) => {
    switch (sortedBy) {
      case SortBy.ALPHABETICALLY:
        return product.name.localeCompare(nextProduct.name);

      case SortBy.CHEAPEST:
        return product.price - nextProduct.price;

      case SortBy.NEWEST:
        return nextProduct.year - product.year;

      default:
        return 0;
    }
  });

  let productsPage = sortedProducts;

  if (perPage > 0) {
    productsPage = sortedProducts.slice(perPage * (page - 1), perPage * page);
  }

  if (hasError) {
    return (
      <div className="product-list__error">
        <p className="product-list__error-message">
          Can&apos;t load products, please try again.
        </p>

        <button
          className="product-list__reload-button"
          onClick={() => {
            navigate(0);
          }}
        >
          Reload page
        </button>
      </div>
    );
  }

  return (
    <ul className="product-list">
      {(productsPage.length > 0 ? productsPage : blankProducts).map(
        (product, id) => (
          <li
            className="product-list__item"
            key={product !== null ? product.id : id}
          >
            <ProductCard product={product} />
          </li>
        ),
      )}
    </ul>
  );
};
