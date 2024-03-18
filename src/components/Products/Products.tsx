import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../Types/Product';
import { Loader } from '../Loader/Loader';
import { getProducts } from '../../api/request';

import { SearchLink } from './SearchLink';

import { ProductList } from '../ProductList/ProductList';
import { Dropdown } from '../Dropdown/Dropdown';

import homeIcon from '../../img/Home.png';
import arrowRightGrey from '../../img/arrowRight.png';
import arrowLeft from '../../img/arrow_left.svg';
import arrowRight from '../../img/arrow_right.svg';

import './products.scss';

type ProductsProps = {
  title: string;
  category: string;
};

export const Products: React.FC<ProductsProps> = ({ title, category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [products, setProducts] = useState([] as Product[]);

  const [searchParams, setSearchParams] = useSearchParams();
  const visibleProducts = searchParams.get('perPage') || 8;
  const sortBy = searchParams.get('sortBy') || 'Newest';
  const [totalPages, setTotalpage] = useState(9);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentSearch = params.get('query');

  useEffect(() => {
    setIsLoader(true);
    getProducts(category)
      .then(response => {
        setProducts(response);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, [category]);

  const selectedBySort = (value: string | number) => {
    params.set('sortBy', value.toString());
    setSearchParams(params);
  };

  const selectedByVisible = (value: string | number) => {
    params.set('perPage', value.toString());
    setSearchParams(params);
  };

  const sortProducts = useCallback(
    (data: Product[]) => {
      switch (sortBy) {
        case 'Newest':
          return [...data].sort((a: Product, b: Product) => b.year - a.year);

        case 'Alphabeticly':
          return [...data].sort((a: Product, b: Product) =>
            a.name.localeCompare(b.name),
          );

        case 'Cheapest':
          return [...data].sort((a: Product, b: Product) => a.price - b.price);

        default:
          return [...data];
      }
    },
    [sortBy],
  );

  const sortByVisible = () => {
    let currentProducts = products;

    if (currentSearch) {
      currentProducts = currentProducts.filter(product =>
        product.name
          .replace(/\s+/g, '')
          .toLowerCase()
          .includes(currentSearch.replace(/\s+/g, '').toLowerCase()),
      );

      if (visibleProducts === 'All') {
        return sortProducts(currentProducts);
      }
    }

    const firstDisplayedItem = (currentPage - 1) * +visibleProducts + 1;
    const lastDisplayedItem = currentPage * +visibleProducts;

    currentProducts = sortProducts(currentProducts).slice(
      firstDisplayedItem - 1,
      lastDisplayedItem,
    );

    if (visibleProducts === 'All') {
      return sortProducts(products);
    }

    return currentProducts;
  };

  useEffect(() => {
    const sortedProducts = sortProducts(products);

    if (currentSearch) {
      const searchProducts = sortedProducts.filter(product =>
        product.name.toLowerCase().includes(currentSearch.toLowerCase()),
      );

      setTotalpage(Math.ceil(searchProducts.length / +visibleProducts));
      setCurrentPage(1);

      return;
    }

    setTotalpage(Math.ceil(sortedProducts.length / +visibleProducts));
  }, [currentSearch, products, sortProducts, visibleProducts]);

  const showPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const showNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const showPage = (page: number) => () => {
    setCurrentPage(page);
  };

  return (
    <div className="product">
      <div className="product__navigation">
        <NavLink to="/">
          <img src={homeIcon} alt="home-icon" />
        </NavLink>
        <img src={arrowRightGrey} alt="arrow-icon" />
        <span className="product__navigation-path">
          {category.slice(0, 1).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <h1 className="product__title title">{title}</h1>
      <p className="product__number">{products.length} models</p>

      <div className="product__filters">
        <Dropdown
          selected={sortBy}
          setSelected={selectedBySort}
          values={['Newest', 'Alphabeticly', 'Cheapest']}
          title="Sort By"
        />
        <Dropdown
          selected={visibleProducts}
          setSelected={selectedByVisible}
          values={[4, 8, 16, 'All']}
          title="Items on page"
        />
      </div>

      {products.length === 0 && (
        <p className="product__not-found">No products found</p>
      )}

      {isLoader ? (
        <Loader />
      ) : (
        <>
          <ProductList products={sortByVisible()} />
          {totalPages > 1 && (
            <div className="product__pagination">
              <button
                type="button"
                className="product__btn btn-arrows"
                onClick={showPrevPage}
              >
                <img
                  className="product__btn-icon"
                  src={arrowLeft}
                  alt="iconLeft"
                />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <SearchLink params={{ page: (i + 1).toString() }} key={i}>
                  <button
                    key={i}
                    type="button"
                    className={classNames('product__pagination-btn', {
                      'product__pagination-btn--active': i + 1 === currentPage,
                    })}
                    onClick={showPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </SearchLink>
              ))}
              <button
                type="button"
                className="product__btn btn-arrows"
                onClick={showNextPage}
              >
                <img
                  className="product__btn-icon"
                  src={arrowRight}
                  alt="iconRight"
                />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
