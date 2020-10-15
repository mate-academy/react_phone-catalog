import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../api/products';
import { useHistory, useLocation } from 'react-router-dom';
import '../PhonesPage/PhonesPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/cart';

export const TabletsPage = ({ tablets }) => {
  const [itemsOnPage, setItemsOnPage] = useState(tablets.length);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(tablets.length);
  const [sortOrder, setSortOrder] = useState('abc');
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const addToCart = (item) => {
    const action = actionCreators.addToCart(item);
    dispatch(action);
  }

  const parseNumber = useCallback(number => {
    return number ? parseFloat(number) + ' MB' : null
  }, []);


  function sortItems(sort) {
    
    tablets.sort((a, b) => ((typeof b[sort] === "number") - (typeof a[sort] === "number"))
    || (a[sort] > b[sort] ? 1 : -1));
    
    searchParams.set('sort', sort);
    history.push({
      search: searchParams.toString()
    })
    return tablets;
  }

  return (
    <section className="store">
      <h1 className="store__title">Tablets</h1>
      <p className="store__subtitle">{tablets.length} models</p>

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
            <option value='name'>Alphabetically</option>
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
            <option value="16" disabled={16 > tablets.length}>16</option>
            <option value="8" disabled={8 > tablets.length}>8</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <div className="store__inner">
        {tablets.map(tablet => {
          const { imageUrl, name, price, ram, screen, capacity, id } = tablet;
          return (
            <div className="store__product product" key={id}>
              <img src={require(`../../../public/${imageUrl}`)} alt={name} className="product__photo"></img>
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
                <button
                  className="product__button button"
                  disabled={cartItems.includes(id)}
                  onClick={() => {
                    addToCart(id);
                  }}
                >
                  <span>
                    Add to cart
                  </span>
                  <span>
                    Added to cart
                  </span>
                </button>
                <div className="product__icon-container icon-container">
                  <a href="#">
                    <span className="icon-container__icon icon-container__icon_favorites"></span>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}