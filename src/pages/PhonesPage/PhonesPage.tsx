import React from "react";
import { ChangeEvent, useContext, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/Pagination/Pagination";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Phone } from "../../types/phone";
import { sortByItem } from "../../types/sortBy";
import { CatalogContext } from "../CatalogContext";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import './PhonesPage.scss';
import Home from '../../images/Home.svg';
import Vector_light_right from '../../images/homePage/Vector_light_right.svg';

export const PhonesPage = () => {
  const {
    phones,
  } = useContext(CatalogContext);

  const [sortBy, setSortBy] = useState<string>();
  let [searchParams, setSearchParams] = useSearchParams();

  if (phones === undefined) {
    return <NotFoundPage/>
  }
  
  const perPage = searchParams.get('perPage') || 'all'; 
  const currentPage = searchParams.get('page') || '1'; 
  const itemsPerPage = perPage === 'all' ? phones.length : perPage; 
  const firstItemIndex = (+currentPage - 1) * +itemsPerPage; 
  const lastItemIndex = Math.min(+currentPage * +itemsPerPage, phones.length);

  const toBeSortedBy = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setSortBy(event.target.value);
  };

  const handlePerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: currentPage,
      perPage: event.target.value,
    })
  }

  const filteredPhones = () => {
    switch (sortBy) {
      case sortByItem.Age:
        return phones?.sort((a, b) => a.year - b.year ? 1 : -1);
      case sortByItem.Name:
        return phones?.sort((a, b) => a.name.localeCompare(b.name));
      case sortByItem.Price:
        return phones?.sort((a, b) => a.price - b.price);
      default:
        return phones;
    }
  };

  const filtered = filteredPhones();

  return (
  <div className="phonesPage">
    <div className="phonesPage__breadcrumbs">
      <NavLink to="/" className="phonesPage__home-link">
        <img
          src={Home}
          alt='home'
          className="phonesPage__home"
        />
      </NavLink>
      <img
        src={Vector_light_right}
        alt='Vector_light_right'
        className="phonesPage__arrow-right"
      />
      <div className="phonesPage__phones">Phones</div>
    </div>
    <h1 className="phonesPage__header">Mobile phones</h1>
    <div className="phonesPage__models">{`${phones.length} models`}</div>
     
      <div className="phonesPage__selectParams">
        <div className="phonesPage__sortBy">
          <div className="phonesPage__choose">Sort by</div>
          <select
            value={sortBy}
            onChange={toBeSortedBy}
            className="phonesPage__selectSort"
          >
            <option></option>
            <option className="phonesPage__option">Newest</option>
            <option className="phonesPage__option">Alphabetically</option>
            <option className="phonesPage__option">Cheapest </option>
          </select>
        </div>
        <div className="phonesPage__itemsOnPage">
          <div className="phonesPage__choose">Items on page</div>
          <select
            value={perPage}
            onChange={handlePerPage}
            className="phonesPage__selectNum"
          >
            <option className="phonesPage__option">all</option>
            <option className="phonesPage__option">4</option>
            <option className="phonesPage__option">8</option>
            <option className="phonesPage__option">16</option>
          </select>
        </div>
      </div>

      <div className="phonesPage__container">
        <ul className="phonesPage__list">
          {filtered?.slice(firstItemIndex, lastItemIndex).map((phone: Phone) => (
            <NavLink 
              key={phone.id} 
              to={`/${phone.id}`}
              className="phonesPage__link"
            >
              <ProductCard phone={phone} />
            </NavLink>
          ))
          }
        </ul>
      </div>
      {/* {perPage !== `${phones.length}`.toString() */}
         <Pagination />
        {/* : null} */}
    </div>
  )
}