import { BaseSyntheticEvent, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ProductPage.scss';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category } from '../../types/category';
import { ProductList } from '../ProductList/ProductList';
import { actions as actionsSearch } from '../../features/seacrchSlice';
import { Breadcrumbs } from '../../components/Breadcrumds';
import { getListParams } from './getListParams';
import { fetchAllProducts } from '../../features/allProductsSlice';

interface Props {
  title: string;
  category: Category;
}

export const DEFAULT_SORT = 'Alphabetically';
export const DEFAULT_PAGE = 'all';

export const ProductPage: React.FC<Props> = ({ title, category }) => {
  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.search.query);

  const products = useAppSelector(state => state.allProducts.products);

  const visibleItems = useMemo(() => {
    return products.filter(item => item.category === category);

  }, [category, products]);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts());
    }
  }, [products]);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortParams = useMemo(
    () => ['Newest', 'Alphabetically', 'Cheapest'],
    [],
  );

  const { 
    sortBy, 
    perPage, 
    currentPage } = getListParams(searchParams);

  const setSortAndPage = (sorting: string, paging: string) => {
    let params = new URLSearchParams();

    if (sorting !== DEFAULT_SORT) {
      params.set('sortBy', sorting)
    }

    if (paging !== DEFAULT_PAGE) {
      params.set('perPage', paging)
    }

    setSearchParams(
      params
    );
  }

  const handlePerPage = (event: BaseSyntheticEvent) => {
    setSortAndPage(sortBy, event.target.value)
  };

  const handleSortBy = (event: BaseSyntheticEvent) => {
    setSortAndPage(event.target.value, perPage)
  };

  const itemToUpperCase = (item: string) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  const filteredProducts = useMemo(() => {
    if (!query) {
      return visibleItems;
    }

    return visibleItems.filter(item => 
      item.id.toLowerCase().includes(query.toLowerCase()));
  }, [visibleItems, query],
  );
  
  useEffect(() => {
   const act = actionsSearch.setVisible(true);
    dispatch(act)

    return () => {
      dispatch(actionsSearch.setVisible(false));
    }
  }, []);

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const titleClass = `productsPage__header theme-${theme}`;
  const modelsClass = `productsPage__models theme-${theme}`;
  const sortByClass = `productsPage__choose theme-${theme}`;
  const selectSort = `productsPage__selectSort theme-${theme}`;
  const prodVars = `productsPage__var theme-${theme}`;
  const prodArr = `productsPage__arr theme-${theme}`;

  return (
    <div className="productsPage">
      <div className="productsPage__constrain">
        <Breadcrumbs title={title}/>
        <h1 className={titleClass}>{itemToUpperCase(title)}</h1>
        <div className={modelsClass}>{`${visibleItems.length} models`}</div>

        <div className="productsPage__selectParams">
          <div className="productsPage__sortBy">
            <div className={sortByClass}>Sort by</div>
            <label className="productsPage__selectWrapper">
              <select
                value={sortBy}
                onChange={handleSortBy}
                className={selectSort}
              >
                {sortParams.map(param => {
                  return <option 
                    key={param}
                    className={prodVars}
                    >
                      {param}
                    </option>;
                })}
              </select>
              <input type='button' className={prodArr}></input>
            </label>
          </div>
          <div className="productsPage__itemsOnPage">
            <div className={sortByClass}>Items on page</div>
            <label className="productsPage__selectWrapper">
            <select
              value={perPage}
              onChange={handlePerPage}
              className={`${selectSort} productsPage__selectSort--num`}
            >
              <option className="productsPage__option">all</option>
              <option className="productsPage__option">4</option>
              <option className="productsPage__option">8</option>
              <option className="productsPage__option">16</option>
            </select>
            <input type='button' className={`${prodArr} productsPage__arr--num`}></input>
            </label>
          </div>
        </div>

        <div className="productsPage__container">
          <ProductList 
            products={filteredProducts} 
            category={category}
            sortBy={sortBy}
            perPage={perPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
