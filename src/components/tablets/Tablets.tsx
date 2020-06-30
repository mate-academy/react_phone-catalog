import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getVisibleGoods } from '../../store';
import { Card } from '../card/Card';

const Tablets = () => {
  const goods = useSelector(getVisibleGoods);
  const [sortField, setSortField] = useState('');



  switch (sortField) {
    case "price":
      goods.sort((a, b) => a.price - b.price);
      break;
    case "discount":
      goods.sort((a, b) => b.discount - a.discount);
      break;
    case "name":
      goods.sort((a, b) => a[sortField].localeCompare(b[sortField]));
      break;
  }

  return (
    <>
      <h1>Tablets</h1>
      <div className='sortBtn__wrapper'>
        <h3 className='sortBtn__title'>Sort by: </h3>
        <button
          className='sortBtn'
          onClick={() => setSortField('price')}>
          cheap to expensive</button>
        <button
          className='sortBtn'
          onClick={() => setSortField('discount')}> discount</button>
        <button
          className='sortBtn'
          onClick={() => setSortField('name')}> title</button>
      </div>
      <div className="Card">
        <ul className="Card__list">
          {goods.filter(good => good.type === 'tablet').map(good => <Card good={good} />)}
        </ul>
      </div>
    </>
  );
};

export default Tablets;
