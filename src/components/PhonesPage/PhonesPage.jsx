import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../api/products';
import { Pagination } from '../Pagination/Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import './PhonesPage.scss';

export const PhonesPage = ({ phones }) => {
  const [itemsOnPage, setItemsOnPage] = useState(phones.length);
  const [buttons, setButtons] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(phones.length);
  const [sortOrder, setSortOrder] = useState('abc');
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const parseNumber = useCallback(number =>
    number ? parseFloat(number) + ' MB' : null);

  useEffect(() => {
    let numOfPages = Math.ceil(phones.length / itemsOnPage);
    let buttonsCount = [];
    for (let i = 1; i <= numOfPages; i++) {
      buttonsCount.push(i);
    }
    setButtons(buttonsCount);

  }, [itemsOnPage]);

  useEffect(() => {
    setLastIndex(+itemsOnPage + startIndex);
  }, [startIndex, itemsOnPage]);

  function sortItems(sort) {
    switch (sort) {
      case 'age':
        phones.sort((a, b) => a.age - b.age);
        break;
      case 'price':
        phones.sort((a, b) => a.price - b.price);
        break;
      default:
        phones.sort((a, b) => a.name.localeCompare(b.name))
    }
    searchParams.set('sort', sort);
    history.push({
      search: searchParams.toString()
    })
    return phones;
  }

  return (
    <>  <section className="store">
      <h1 className="store__title">Mobile phones</h1>
      <p className="store__subtitle">{phones.length} models</p>

      <div className="store__options options">
        <div>
          <label htmlFor="sort" className="options__title">Sort by </label>
          <select name="sort"
            className="options__select"
            onChange={(e) => {
              setSortOrder(e.target.value);
              sortItems(e.target.value);
            }}
          >
            <option value='abc'>Alphabetically</option>
            <option value="age">Newest</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div>
          <label htmlFor="phonesCount" className="options__title">Items on page </label>
          <select name="phonesCount"
            className="options__select options__select_short"
            value={itemsOnPage}
            onChange={((e) => {
              setItemsOnPage(e.target.value);
              setStartIndex(0);
              searchParams.set('perPage', itemsOnPage);
              history.push({
                search: searchParams.toString()
              })
            })}
          >
            <option value="16">16</option>
            <option value="8">8</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <div className="store__inner">
        {phones.slice(startIndex, lastIndex).map(phone => {
          const { imageUrl, name, price, ram, screen, capacity, id } = phone;
          return (
            <div className="store__product product" key={id}>
              <img src={imageUrl} alt="Apple iPhone 11" className="product__photo"></img>
              <h3 className="product__title">{name}</h3>
              <div className="price product__price">
                <p className="price__current">${price}</p>
              </div>
              <div className="product__details details">
                <div className="details__row details__row_1">
                  <p className="details__title">Screen</p>
                  <p className="details__parameter">{screen}</p>
                </div>
                <div className="details__row details__row_2">
                  <p className="details__title">Capacity</p>
                  <p className="details__parameter">{parseNumber(capacity)}</p>
                </div>
                <div className="details__row details__row_3">
                  <p className="details__title">RAM</p>
                  <p className="details__parameter">{parseNumber(ram)}</p>
                </div>
              </div>
              <div className="product__bottom">
                <button className="product__button button">
                  <a href="#" className="button__link">Add to cart</a>
                </button>
                <div className="product__icon-container icon-container">
                  <a href="#">
                    <span className="icon-container__icon icon-container__icon_favorites"></span>
                  </a>
                </div>
              </div>
            </div>
          )
        }
        )}
      </div>
      <Pagination
        setStartIndex={setStartIndex}
        itemsOnPage={itemsOnPage}
        buttons={buttons}
        startIndex={startIndex}
        lastIndex={lastIndex}
        total={phones.length}
        searchParams={searchParams}
      >
      </Pagination>
    </section>
    </>
  )
}