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
  error?: string;
  buttonText?: string;
};

const blankProducts: null[] = new Array(10).fill(null);

export const ProductsList: React.FC<Props> = ({
  products,
  DEF_SORT = SortBy.NEWEST,
  PER_PAGE = PerPage.EIGHT,
  error = '',
  buttonText = 'Reload page',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  if (error) {
    return (
      <div className="product-list__error">
        <p className="product-list__error-message">{error}</p>

        <button
          className="product-list__reload-button"
          onClick={() => {
            setSearchParams('');
            navigate(0);
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  }

  return (
    <ul className="product-list">
      {(productsPage.length > 0 ? productsPage : blankProducts).map(
        (product, index) => (
          <li
            className="product-list__item"
            key={product !== null ? product.id : index}
          >
            <ProductCard product={product} />
          </li>
        ),
      )}
    </ul>
  );
};
