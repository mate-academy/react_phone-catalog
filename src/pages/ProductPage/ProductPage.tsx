import { ChangeEvent, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import './ProductPage.scss';
import Home from '../../images/Home.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productssSlice';
import { Category } from '../../types/category';
import { ProductList } from '../ProductList/ProductList';
import { TabAccessPhone } from '../../types/tabAccessPhones';
import { useEffect } from 'react';

interface Props {
  title: string;
}

export const ProductPage: React.FC<Props> = ({ title }) => {
  const dispatch = useAppDispatch();

  const products = () => {
    let prodItems;

    switch (title) {
      case 'phones':
        const { phones } = useAppSelector(state => state.products);

        dispatch(fetchProducts(Category.PHONES));

        return (prodItems = phones);
      case 'tablets':
        const { tablets } = useAppSelector(state => state.products);

        dispatch(fetchProducts(Category.TABLETS));

        return (prodItems = tablets);
      case 'accessories':
        const { accessories } = useAppSelector(state => state.products);

        dispatch(fetchProducts(Category.ACCESSORIES));

        return (prodItems = accessories);
      default:
        break;
    }

    return prodItems;
  };

  const prod = products();

  useEffect(() => {
    dispatch(fetchProducts(Category.PHONES));
  }, [dispatch]);

  console.log(prod);

  const productItems = useEffect(() => {
    prod ? prod : <NotFoundPage />;
  }, [prod]);

  const [sortBy, setSortBy] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';

  const toBeSortedBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handlePerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: currentPage,
      perPage: event.target.value,
    });
  };

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
        <div className="productsPage__models">{`${productItems.length} models`}</div>

        <div className="productsPage__selectParams">
          <div className="productsPage__sortBy">
            <div className="productsPage__choose">Sort by</div>
            <select
              value={sortBy}
              onChange={toBeSortedBy}
              className="productsPage__selectSort"
            >
              <option></option>
              <option className="productsPage__option">Newest</option>
              <option className="productsPage__option">Alphabetically</option>
              <option className="productsPage__option">Cheapest </option>
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
          <ProductList productItems={productItems} />
        </div>
      </div>
    </div>
  );
};
