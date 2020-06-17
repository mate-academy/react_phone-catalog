import React from 'react';
import { getVisibleGoods } from '../../store';
import { getQuery } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../store/query';
//import { Card } from '../card/Card';



export const Search = () => {

  const query = useSelector(getQuery);
  const dispatch = useDispatch();
 //const goods = useSelector(getVisibleGoods);
  console.log(getVisibleGoods.length);
  //const searchParams = new URLSearchParams(location.search)
  // const query: string = searchParams.get('query') || '';
  // const pattern = new RegExp(query, 'i');
  return (
    <>
    <input
      type="text"
      value={query}
      onChange={({ target }) => {
        dispatch(setQuery(target.value));
      }}
    />
    {/* <ul>
      {goods.map(good => <Card good={good} />)}
    </ul> */}
    </>
  )
}
