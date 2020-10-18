import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../api/products';
import { Pagination } from '../Pagination/Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import './PhonesPage.scss';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard/ProductCard';

export const PhonesPage = ({ phones }) => {
  const [itemsOnPage, setItemsOnPage] = useState(phones.length);
  const [buttons, setButtons] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(phones.length);
  const [sortOrder, setSortOrder] = useState('abc');
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

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
    phones.sort((a, b) => ((typeof b[sort] === "number") - (typeof a[sort] === "number"))
      || (a[sort] > b[sort] ? 1 : -1));

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
            <option value="16">16</option>
            <option value="8">8</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
      <div className="store__inner">
        {phones.slice(startIndex, lastIndex).map(phone =>
          <React.Fragment key={phone.id}>
            <ProductCard product={phone} />
          </React.Fragment>
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