/* eslint-disable */
import { PhoneItem } from '../../components/phone/PhoneItem';
import React, {
  useContext,
} from "react";
import { StateContext } from '../../AppContext';
import {
  ACTIONS, getCurrentItems,
  getFavourite
} from '../../helpers/utils';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../pagination/Pagination';
import { Product } from '../../types';

export const PhonesPages: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentPage = searchParams.get('page') || '1';

  const itemsPerpage = searchParams.get('itemsPerPage') || '4'
  const search = searchParams.get('search') || '';

  if (state.products && state.favourites.length > 0) {
    console.log(getFavourite(state.products, state.favourites[0]), 'find fav');
  }

  let currentItems: Product[] = [];

  if (state.products) {
    if (search.length > 0) {
      currentItems = state.products.filter(phone => phone.name.includes(search));
    } else if (itemsPerpage === 'All') {
      currentItems = state.products;
    } else {
      currentItems = getCurrentItems(state.products, currentPage, +itemsPerpage);
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({ type: ACTIONS.SET_ITEMS_PER_PAGE, payload: e.target.value })
    params.set('itemsPerPage', e.target.value);
    setSearchParams(params);
  }

  return (
    <div className="">
      <div className="navigation-block">
        <div>
          <img
            src="./img/icons/Home.svg"
            className="bottom-range"
            alt="img"
          />
        </div>
        <div>
          <img src="./img/icons/arrowRight.svg" alt="img" />
        </div>
        <div>Phones {state.itemsPerPage}</div>
      </div>
      <p className="font-header"> Mobile phones</p>
      <div className="font-models-amount">95 models</div>


      <div className="select-block">

        <div className="select-left">
          <div className="select-text">Sort by</div>

          <select className='textField' onChange={(e) => changeHandler(e)}>
            <option value="0" >
              Newest
            </option>
            <option value="1">
              Oldest
            </option>
          </select>
        </div>
        <div className="select-right">
          <div className="select-text">Items on page</div>

          <select className='textField' defaultValue='4' onChange={(e) => changeHandler(e)}>
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
          const key = product.id;
          return (
            <PhoneItem product={product} key={key} />
          )
        })}
      </div>

      {state.itemsPerPage !== 'All' && <Pagination />}



    </div>
  );
};
