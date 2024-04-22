import { ChangeEvent, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { TabAccess } from '../../types/tablets';
import { SortByItem } from '../../helpers/sortBy';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import './ProductsPage.scss';
import Home from '../../images/Home.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import React from 'react';
import { PhoneTabAccessCard } from '../../components/PhoneTabAccessCard/PhoneTabAccessCard';

type Props = {
  products: TabAccess[];
  title: string;
}
export const ProductsPage: React.FC<Props> = ({ products, title }) => {

  const [sortBy, setSortBy] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  
  if (products === undefined) {
    return <NotFoundPage />;
  }

  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? products.length : perPage;
  const firstItemIndex = (+currentPage - 1) * +itemsPerPage;
  const lastItemIndex = Math.min(+currentPage * +itemsPerPage, products.length);

  const showPagination = parseInt(perPage) >= products.length;

  const toBeSortedBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handlePerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: currentPage,
      perPage: event.target.value,
    });
  };

  const filteredPhones = () => {
    switch (sortBy) {
      // case SortByItem.Age:
      //   return phones?.sort((a, b) => (a.year - b.year ? 1 : -1));
      case SortByItem.Name:
        return products?.sort((a, b) => a.name.localeCompare(b.name));
      case SortByItem.Price:
        return products?.sort((a, b) => a.priceRegular - b.priceDiscount);
      default:
        return products;
    }
  };

  const filtered = filteredPhones().slice(firstItemIndex, lastItemIndex);

  const toPagination = filtered;

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
        <h1 className="productsPage__header">{title}</h1>
        <div className="productsPage__models">{`${products.length} models`}</div>

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
          <ul className="productsPage__list">
            {filtered?.map((item: TabAccess) => (
              <NavLink
                key={item.id}
                to={{  pathname: `${pathname}/${item.id}`}}
                className="productsPage__link"
              >
                <PhoneTabAccessCard item={item} />
              </NavLink>
            ))}
          </ul>
        </div>
        {showPagination ? null : <Pagination toPagination={toPagination}/>}
      </div>
    </div>
  );
};
