/* eslint-disable */
import { ProductItem } from '../../components/product/ProductItem';
import React, {
  useContext,
  useState,
} from "react";
import { StateContext } from '../../AppContext';
import {
  ACTIONS,
  getCurrentItems,
} from '../../helpers/utils';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../pagination/Pagination';
import { Product } from '../../types';
import { NoResults } from '../NoResults/NoResults';

export const ProductPage: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentPage = searchParams.get('page') || '1';

  const itemsPerpage = searchParams.get('itemsPerPage') || '4'
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'age';
  const [sortValue, setSortValue] = useState(sort);
  const location = useLocation();

  // localStorage.clear()

  let currentItems: Product[] = [];

  let copyOfProducts: Product[] = [];

  if (state.products) {

    const fullName = location.pathname;
    const newName = fullName.slice(1, fullName.length - 1);

    copyOfProducts = [...state.products.filter(product => product.type === newName)]

    if (search.length > 0) {
      let copyOfCopy = [...copyOfProducts];
      copyOfProducts = [...copyOfCopy.filter(phone => phone.name.includes(search))];
      if (copyOfProducts.length === 0) {
        return <NoResults headline='Nothing was found'/>
      }
      currentItems = getCurrentItems(copyOfProducts, currentPage, +itemsPerpage);
    } else if (itemsPerpage === 'All') {
      currentItems = copyOfProducts;
    } else {
      currentItems = getCurrentItems(copyOfProducts, currentPage, +itemsPerpage);
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({ type: ACTIONS.SET_ITEMS_PER_PAGE, payload: e.target.value })
    params.set('itemsPerPage', e.target.value);
    setSearchParams(params);
  }


  function sortProducts(e: React.ChangeEvent<HTMLSelectElement>) {
    params.set('sort', e.target.value);
    setSearchParams(params);
    setSortValue(e.target.value)
  }

  return (
    <div>

      <p className="font-header">Mobile phones</p>
      <div className="font-models-amount">{copyOfProducts.length} models</div>


      <div className="select-block">

        <div className="select-left">
          <div className="select-text">Sort by</div>

          <select
            value={sortValue}
            className='textField'
            onChange={(e) => sortProducts(e)}
          >
            <option value="age">
              Newest
            </option>
            <option value="ageDesc">
              Oldest
            </option>
            <option value="name">
              Alphabetically
            </option>
            <option value="price">
              Cheap first
            </option>
            <option value="priceDesc">
              Expencive first
            </option>
          </select>
        </div>
        <div className="select-right">
          <div className="select-text">Items on page</div>

          <select className='textField' defaultValue={itemsPerpage} onChange={(e) => changeHandler(e)}>
            <option value="4">
              4
            </option>
            <option value="8">
              8
            </option>
            <option value="16">
              16
            </option>
            <option value="All">
              All
            </option>
          </select>
        </div>

      </div>

      <div className="list-container">

        {currentItems.map(product => {
          // const key = product.id;
          return (
            <ProductItem product={product} />
          )
        })}
      </div>

      {itemsPerpage !== 'All' && <Pagination pages={copyOfProducts.length}/>}



    </div>
  );
};
