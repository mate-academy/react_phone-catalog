import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../api/products';
import { useHistory, useLocation } from 'react-router-dom';
import '../PhonesPage/PhonesPage.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { PhonesPage } from '../PhonesPage/PhonesPage';

export const TabletsPage = ({ tablets }) => {
  const [itemsOnPage, setItemsOnPage] = useState(tablets.length);
  const [sortOrder, setSortOrder] = useState('abc');
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

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
        {tablets.map(tablet =>
          <React.Fragment key={tablet.id}>
            <ProductCard product={tablet} />
          </React.Fragment>
        )}
      </div>
    </section>
  )
}