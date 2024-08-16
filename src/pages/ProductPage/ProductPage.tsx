import { BaseSyntheticEvent, ChangeEvent, useEffect, useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './ProductPage.scss';
import Home from '../../images/Home.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category } from '../../types/category';
import { ProductList } from '../ProductList/ProductList';
import { fetchProducts } from '../../features/productssSlice';
import { actions } from '../../features/seacrchSlice';

interface Props {
  title: string;
  category: Category;
}

export const ProductPage: React.FC<Props> = ({ title, category }) => {
  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.search.query);

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
    () => ['', 'Newest', 'Alphabetically', 'Cheapest'],
    [],
  );

  const sortBy = searchParams.get('sortBy') || '';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';

  const handlePerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: currentPage,
      perPage: event.target.value,
      sortBy: sortBy,
    });
  };

  const handleSortBy = (event: BaseSyntheticEvent) => {
    setSearchParams({
      page: currentPage,
      perPage: perPage,
      sortBy: event.target.value,
    });
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
   const act = actions.setVisible(true);
    dispatch(act)

    return () => {
      dispatch(actions.setVisible(false));
    }
  }, [])

  console.log(filteredProducts)

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
              onChange={handleSortBy}
              className="productsPage__selectSort"
            >
              {sortParams.map(param => {
                return <option key={param}>{param}</option>;
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
          <ProductList products={filteredProducts} category={category}/>
        </div>
      </div>
    </div>
  );
};
