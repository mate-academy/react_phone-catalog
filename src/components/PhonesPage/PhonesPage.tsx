import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import './PhonesPage.scss';

type Props = {
  phones: ProductItem[];
};

export const PhonesPage: React.FC<Props> = ({ phones }) => {
  const [phonesList, setPhonesList] = useState<ProductItem[]>([]);
  const [sortedPhones, setSortedPhones] = useState([...phones]);

  const perPageOption = ['2', '4', '8', '16'];
  const location = useLocation();
  const history = useHistory();


  const searchParams = new URLSearchParams(location.search);

  const quantity = searchParams.get('quantity') || `${phones.length}`;
  const sortType = searchParams.get('sort') || 'age';

  useEffect(() => {
    setPhonesList(phones);
  }, []);

  const handleSortProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    searchParams.set('sort', value);
    history.push({
      search: searchParams.toString(),
    });
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    searchParams.set('quantity', value);
    history.push({
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    switch (sortType) {
      case 'name':
        setSortedPhones([...phonesList].sort((a, b) => a[sortType].localeCompare(b[sortType])).slice(0, +quantity));
        break;
      case 'age':
      case 'price':
        setSortedPhones([...phonesList].sort((a, b) => a[sortType] - b[sortType]).slice(0, +quantity));
        break;
      default: setSortedPhones([...phonesList]);
    }
  }, [phonesList, sortType, quantity]);

  return (
    <div className="phones__container phones container">
      <h1 className="phones__title">Mobile phones</h1>
      <p className="phones__quantity">
        {phones.length}
        {/* {sortedPhones.length} */}
        {' '}
        <span className="phones__quantityText">models</span>
      </p>
      <div className="phones__filter filter">
        <div className="flter__sotrBy">
          <p className="filter__legend">
            Sort by
          </p>
          <select
            className="filter__select"
            onChange={handleSortProduct}
          >
            {/* <option value="">choose</option> */}
            <option value="age">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>
        <div className="flter__quantity">
          <p className="filter__legend">
            Items on page
          </p>
          <select
            className="filter__select filter__select--quantity"
            onChange={handleQuantityChange}
          >
            <option value={phones.length}>All</option>
            {perPageOption.map(item => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="phones__list">
        {sortedPhones.map(product => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};
