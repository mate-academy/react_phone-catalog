import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getVisibleGoods } from '../../store';
import { Card } from '../card/Card';
import './Phones.scss';



const Phones = () => {
  const goods = useSelector(getVisibleGoods);

  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [oldFieldName, setOldFieldName ] = useState('');


  const setSort = (newFieldName: string) => {
    if (oldFieldName && newFieldName === oldFieldName) {
      setIsReversed(!isReversed);
    }
    else {
      setSortField(newFieldName);
      setOldFieldName(newFieldName);
    }
  };


  switch (sortField) {
    case "price":
      goods.sort((a, b) => sortNumeric(a, b, sortField, isReversed));
      break;

    case "discount":
      goods.sort((a, b) => sortNumeric(a, b, sortField, isReversed));
      break;

    case "name":
      goods.sort((a, b) => sortText(a, b, sortField, isReversed));
      break;
  };

  // if (isReversed) {
  //   goods.reverse();
  // }
  const sortedFields = [
    { field: "price", label: "Price" },
    { field: "discount", label: "Discount" },
    { field: "name", label: "Name 11" },
  ];

  return (
    <>
      <h1>Phones</h1>
      <div className='sortBtn__wrapper'>
        <h3 className='sortBtn__title'>Sort by: </h3>
        {sortedFields.map(field => {
          let className = 'sortBtn ';
          className += isReversed ? 'asc' : 'desc';

          return <button
            className={className}
            onClick={() => setSort(field.field)}>
            {field.label}
          </button>
        })}
      </div>

      <div className="Card">
        <ul className="Card__list">
          {goods.filter(good => good.type === 'phone').map(good => <Card good={good} />)}
        </ul>
      </div>
    </>
  );
};

export default Phones;


const sortNumeric = (a: IIndexable, b: IIndexable, sortField: string, isReversed: boolean) => {
  return isReversed
    ? b[sortField] - a[sortField]
    : a[sortField] - b[sortField]
}
const sortText = (a: IIndexable, b: IIndexable, sortField: string, isReversed: boolean) => {
  return isReversed
    ? a[sortField].localeCompare(b[sortField])
    : b[sortField].localeCompare(a[sortField]);
}


