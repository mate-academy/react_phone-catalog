import { ChangeEvent, useEffect, useMemo } from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import './ProductPage.scss';
import Home from '../../images/Home.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category } from '../../types/category';
import { ProductList } from '../ProductList/ProductList';
import { fetchProducts } from '../../features/productssSlice';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelpers';
import { SortByItem } from '../../helpers/sortBy';

interface Props {
  title: string;
  category: Category;
}

export const ProductPage: React.FC<Props> = ({ title, category }) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(state => state.products);

  const visibleItems = useMemo(() => {
    if (category === Category.PHONES) {
      return products.phones;
    }

    if (category === Category.TABLETS) {
      return products.tablets;
    }

    return products.accessories;
  }, [category, products.accessories, products.tablets, products.phones]);

  useEffect(() => {
    if (category) {
      dispatch(fetchProducts(category));
    }
  }, [dispatch, category]);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortParams = useMemo(
    () => ['None', 'Newest', 'Alphabetically', 'Cheapest'],
    [],
  );

  const sortBy = searchParams.get('sortBy') || SortByItem.None;
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';

  const toBeSortedBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: currentPage,
      perPage: perPage,
      sortBy: event.target.value as SortByItem,
    });
  };

  const handlePerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: currentPage,
      perPage: event.target.value,
      sortBy: sortBy,
    });
  };

  const currentValue = useMemo(
    () => searchParams.get(sortBy) || sortParams[0],
    [searchParams, sortBy, sortParams],
  );

  const selectedItem = useMemo(
    () => sortParams.find(item => item === currentValue) || sortParams[0],
    [sortParams, currentValue],
  );

  const itemToUpperCase = (item: string) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  return (
    <div className="productsPage">
      <div className="productsPage__constrain">
        <div className="productsPage__breadcrumbs">
          <NavLink to="/" className="productsPage__home-link">
            <img src={Home} alt="home" className="productsPage__home" />
          </NavLink>
          <img
            src={Vec_light_right}
            alt="Vector_light_right"
            className="productsPage__arrow-right"
          />
          <div className="productsPage__phones">{title}</div>
        </div>
        <h1 className="productsPage__header">{itemToUpperCase(title)}</h1>
        <div className="productsPage__models">{`${visibleItems.length} models`}</div>

        <div className="productsPage__selectParams">
          <div className="productsPage__sortBy">
            <div className="productsPage__choose">Sort by</div>
            <select
              value={sortBy}
              onChange={toBeSortedBy}
              className="productsPage__selectSort"
            >
              {sortParams.map((param, index) => {
                return (
                  <option key={index}>
                    <Link
                      to={{
                        search: getSearchWith(searchParams, {
                          sortBy: param,
                          page: currentPage,
                          perPage: perPage,
                        }),
                      }}
                      className={classNames('productsPage__option', {
                        'productsPage__option--main': param === selectedItem,
                      })}
                    >
                      {param}
                    </Link>
                  </option>
                );
              })}
            </select>
          </div>
          <div className="productsPage__itemsOnPage">
            <div className="productsPage__choose">Items on page</div>
            <select
              value={perPage}
              onChange={handlePerPage}
              className="productsPage__selectNum"
            >
              <option className="productsPage__option">all</option>
              <option className="productsPage__option">4</option>
              <option className="productsPage__option">8</option>
              <option className="productsPage__option">16</option>
            </select>
          </div>
        </div>

        <div className="productsPage__container">
          <ProductList products={visibleItems} />
        </div>
      </div>
    </div>
  );
};
