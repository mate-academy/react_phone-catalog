import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../searchHelper';
import { Pagination, PaginationProps } from '../Pagination';
import { ProductCard, ProductCardSkeleton } from '../../ProductCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ProductList.scss';
import { Product } from '../../../types/product';
import { useTranslation } from 'react-i18next';

type Props = {
  products: Product[];
  isLoading: boolean;
};

export const ProductList: React.FC<Props> = ({ products, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sortBy') || 'default';
  const perPage = searchParams.get('perPage') || '16';
  const indexOfLastItem = currentPage * Number(perPage);
  const indexOfFirstItem = indexOfLastItem - Number(perPage);
  const { t } = useTranslation();

  function sortProduct(productsArr: Product[], sortB: string) {
    switch (sortB) {
      case t('Newest'):
        return productsArr.sort((a, b) => b.year - a.year);

      case t('Alphabetically'):
        return productsArr.sort((a, b) => b.name.localeCompare(a.name));

      case t('RAM'):
        return productsArr.sort((a, b) => b.ram.localeCompare(a.ram));

      case t('Color'):
        return productsArr.sort((a, b) => b.color.localeCompare(a.color));

      case t('Price: Low to High'):
        return productsArr.sort((a, b) => a.price - b.price);

      case t('Price: High to Low'):
        return productsArr.sort((a, b) => b.price - a.price);

      default:
        return productsArr.sort((a, b) => b.year - a.year);
    }
  }

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handlePageChange: PaginationProps['onPageChange'] = page => {
    const newParams: SearchParams = {};

    if (page !== currentPage) {
      if (page !== 1) {
        newParams.page = page.toString();
      } else {
        newParams.page = null;
      }

      if (perPage !== '16') {
        newParams.perPage = perPage;
      } else {
        newParams.perPage = null;
      }
    }

    setSearchWith(newParams);
  };

  const sortedProducts = sortProduct(products, sortBy);

  return (
    <>
      {isLoading ? (
        <div className="loading__block">
          {Array.from({ length: 4 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <TransitionGroup className="ProductsList__cards">
            {sortedProducts
              .slice(indexOfFirstItem, indexOfLastItem)
              .map(product => (
                // eslint-disable-next-line
                <CSSTransition
                  in={true}
                  timeout={300}
                  classNames={'product-list'}
                  unmountOnExit
                >
                  <ProductCard
                    key={product.id}
                    product={product}
                    className="ProductsList__card"
                  />
                </CSSTransition>
              ))}
          </TransitionGroup>
          <Pagination
            total={products.length}
            perPage={Number(perPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

type PropsFav = {
  favourites: Product[];
};

export const ProductListFavourites: React.FC<PropsFav> = ({ favourites }) => {
  return (
    <TransitionGroup className="ProductsList__cards">
      {favourites.map(product => (
        <CSSTransition key={product.id} timeout={300} classNames="item">
          <ProductCard
            key={product.id}
            product={product}
            className="ProductsList__card"
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
