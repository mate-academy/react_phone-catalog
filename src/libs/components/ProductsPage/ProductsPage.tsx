/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FilterType, Product } from '../../types';
import { SortType } from '../../types/sortType.enum';
import {
  getCategoryTitle,
  chooseCurrentProducts,
  fetchCurrentProducts,
} from '../../utils';

import { SectionHeader } from '../SectionHeader';
import { PagePagination } from '../PagePagination';
import { PageFilter } from '../PageFilter';
import { PageSmallNav } from '../PageSmallNav';
import { ProductCard } from '../ProductCard';
import { NoResults } from '../NoResults';
import { Loader } from '../Loader';

import './ProductsPage.scss';

type Props = {
  classNames?: string,
};

export const getVisibleProducts = (
  products: Product[],
  sortValue: SortType,
  filterValue: FilterType,
  page: number,
): Product[] => {
  const visibleProducts = [...products];

  switch (sortValue) {
    case SortType.Alphabetically:
      visibleProducts.sort((pr1, pr2) => (
        pr1.name.localeCompare(pr2.name)
      ));
      break;

    case SortType.Cheapest:
      visibleProducts.sort((pr1, pr2) => (
        pr1.price - pr2.price
      ));
      break;

    default:
      visibleProducts.sort((pr1, pr2) => (
        pr1.age - pr2.age
      ));
      break;
  }

  switch (filterValue) {
    case '4':
    case '8':
    case '16': {
      const index = ((page - 1) * (+filterValue));

      return visibleProducts.slice(
        index, +filterValue + index,
      );
    }

    default:
      return visibleProducts;
  }
};

export const ProductsPage: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {
    phones,
    tablets,
    accessories,
    loaded,
    hasError,
  } = useAppSelector(state => state.products);

  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Newest);
  const [filterBy, setFilterBy] = useState<FilterType>('4');
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const categoryName = location.pathname.slice(1);

  const productsCount = currentProducts.length;
  const title = getCategoryTitle(categoryName);

  const visibleProducts = getVisibleProducts(
    currentProducts,
    sortBy,
    filterBy,
    currentPage,
  );

  useEffect(() => {
    setCurrentProducts(
      chooseCurrentProducts(categoryName, phones, tablets, accessories),
    );
  }, [phones, tablets, accessories, categoryName]);

  useEffect(() => {
    dispatch(fetchCurrentProducts(categoryName));
  }, [dispatch, categoryName]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  return (
    <div className="products-page">
      <PageSmallNav />

      {!loaded && <Loader />}

      {
        (loaded && productsCount && !hasError)
          ? (
            <>
              <div className="products-page__title">
                <SectionHeader
                  title={title}
                  subtitle={`${productsCount} models`}
                />
              </div>

              <PageFilter
                setSortValue={setSortBy}
                setFilterValue={setFilterBy}
                sortBy={sortBy}
                filterBy={filterBy}
              />

              <div
                className="products-page__cards"
                data-cy="productList"
              >
                {
                  visibleProducts.map(product => (
                    <ProductCard
                      product={product}
                      key={product.id}
                    />
                  ))
                }
              </div>

              <PagePagination
                productsCount={productsCount}
                currentPage={currentPage}
                setCurrentPageValue={setCurrentPage}
                filterValue={filterBy}
              />
            </>

          )
          : (
            <NoResults title={title} />
          )
      }

    </div>
  );
};
