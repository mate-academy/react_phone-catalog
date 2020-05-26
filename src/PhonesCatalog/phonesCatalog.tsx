import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import {
  ARROW_UP, downloadProducts, FAVOURITES_ICON, HOME_PAGE_ICON,
} from '../Additionals/additional_api';
import './phonesCatalog.scss';
import { Phones } from '../Additionals/interfaces';
import { NavBar } from './navBar';

export const PhonesCatalog = () => {
  const [phones, setPhones] = useState([]);
  const [sort, setSort] = useState('age');
  const [viewQty, setViewQty] = useState(4);
  const [position, setPosition] = useState(0);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    async function fetchData() {
      return downloadProducts();
    }

    fetchData().then(data => data
      .filter((el: { type: string }) => el.type === 'phone'))
      .then(data => setPhones(data));
  }, []);

  const getSortedItems = (query: string) => {
    if (query === 'age') {
      return phones.sort((a: { age: number },
        b: { age: number }) => a.age - b.age);
    }

    if (query === 'name') {
      return phones
        .sort((a: { name: string },
          b: { name: string }) => a.name.localeCompare(b.name));
    }

    if (query === 'price_asc') {
      return phones.sort((a: { price: number },
        b: { price: number }) => a.price - b.price);
    }

    if (query === 'price_desc') {
      return phones.sort((a: { price: number },
        b: { price: number }) => b.price - a.price);
    }

    return undefined;
  };

  const sortedPhones = getSortedItems(sort);

  const handleSortView = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    setPosition(0);
    setActiveTab(1);
  };

  const handleViewQty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setViewQty(+event.target.value);
    setPosition(0);
    setActiveTab(1);
  };

  return (
    <div className="PhonesCatalog">
      <div className="breadcrumb">
        <NavLink to="/" className="breadcrumb__link">
          <img
            src={HOME_PAGE_ICON}
            alt="home page"
            className="breadcrumb__link_home"
          />
        </NavLink>
        <img src={ARROW_UP} alt=" " className="breadcrumb__arrow" />
        <span className="breadcrumb__currentPage">Phones</span>
      </div>
      <h1 className="PhonesCatalog__header">Mobile phones</h1>
      <p className="PhonesCatalog__qty">
        {phones.length}
        {' '}
        models
      </p>
      <div className="PhonesCatalog__sorting">
        <div className="PhonesCatalog__sorting_wrapper">
          <span
            className="PhonesCatalog__sorting_title"
          >
            Sort by
          </span>
          <select
            onChange={(event) => handleSortView(event)}
            id="sortBy"
            className="PhonesCatalog__sorting_option"
          >
            <option value="age">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price_asc">Price Ascending</option>
            <option value="price_desc">Price Descending</option>
          </select>
        </div>
        <div className="PhonesCatalog__sorting_wrapper">
          <span
            className="PhonesCatalog__sorting_title"
          >
            Items on page
          </span>
          <select
            onChange={(event) => handleViewQty(event)}
            id="sortQty"
            className="PhonesCatalog__sorting_option"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>

      </div>
      <div
        className="PhonesCatalog__items_wrapper"
        style={{ height: `${(viewQty / 4) * 507}px` }}
      >
        <div
          className="PhonesCatalog__items"
          style={{ bottom: position }}
        >
          {sortedPhones?.map((phone: Phones) => (
            <div key={phone.id} className="discount__list_item card">
              <img
                className="card__image"
                src={phone.imageUrl}
                alt={phone.id}
              />
              <p className="card__title">{phone.name}</p>
              <div className="card__price">
                {phone.discount ? (
                  <span className="card__price_new">
                    $
                    {phone.price * (1 - (phone.discount / 100))}
                  </span>
                ) : ''}
                <span
                  className={cn(phone.discount
                    ? 'card__price_new card__price_old'
                    : 'card__price_new')}
                >
                  $
                  {phone.price}
                </span>
              </div>
              <div className="card__specification_wrapper">
                <div className="card__specification">
                  <span className="card__specification_title">Screen</span>
                  <span className="card__specification_description">
                    {phone.screen}
                  </span>
                </div>
                <div className="card__specification">
                  <span className="card__specification_title">Capacity</span>
                  <span className="card__specification_description">
                    {phone.capacity}
                  </span>
                </div>
                <div className="card__specification">
                  <span className="card__specification_title">RAM</span>
                  <span className="card__specification_description">
                    {phone.ram}
                  </span>
                </div>
              </div>
              <div className="discount__list_item-action action">
                <button
                  type="button"
                  className="action__buy"
                >
                  Add to cart
                </button>
                <img
                  className="action__add-to-fav"
                  alt="favourites"
                  src={FAVOURITES_ICON}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {sortedPhones && sortedPhones.length > viewQty ? (
        <div className="PhonesCatalog__navigation">
          <NavBar
            sortedPhones={sortedPhones}
            activeTab={activeTab}
            viewQty={viewQty}
            position={position}
            setActiveTab={setActiveTab}
            setPosition={setPosition}
          />
        </div>
      ) : ''}
    </div>
  );
};
