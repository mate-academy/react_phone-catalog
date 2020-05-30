import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getProducts } from '../../api/api';
import { ProductCard } from '../ProductCard';
import './PhonesPage.scss';

export const PhonesPage: React.FC = () => {
  const [phonesList, setPhonesList] = useState<ProductItem[]>([]);
  // const [sortedPhones, setSortedPhones] = useState(phonesList);
  // const [quantityPerPage, setquantityPerPage] = useState(sortedPhones);
  const [quantityPerPage, setquantityPerPage] = useState<ProductItem[]>([]);
  const [sortedPhones, setSortedPhones] = useState<ProductItem[]>([]);
  const perPageOption = ['All', '2', '4', '8', '16'];
  const location = useLocation();
  const history = useHistory();


  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    getProducts()
      .then(data => {
        setPhonesList(data.filter((product: ProductItem) => product.type === 'phone'));
        setquantityPerPage(data.filter((product: ProductItem) => product.type === 'phone'));
        setSortedPhones(data.filter((product: ProductItem) => product.type === 'phone'));
      });
  }, []);

  useEffect(() => {
    setSortedPhones(quantityPerPage);
  }, [quantityPerPage]);

  const handleSortProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    searchParams.set('sort', value);
    history.push({
      search: searchParams.toString(),
    });

    switch (value) {
      case 'name':
        setSortedPhones([...phonesList].sort((a, b) => a[value].localeCompare(b[value])));
        break;
      case 'age':
      case 'price':
        setSortedPhones([...phonesList].sort((a, b) => a[value] - b[value]));
        break;
      default:
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    searchParams.set('quantity', value);
    history.push({
      search: searchParams.toString(),
    });

    if (value !== 'All') {
      setquantityPerPage([...phonesList].slice(0, +value));
    } else {
      setquantityPerPage([...phonesList]);
    }
  };

  return (
    <div className="phones__container phones">
      <h1 className="phones__title">Mobile phones</h1>
      <p className="phones__quantity">
        {phonesList.length}
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
            <option value="">choose</option>
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
            className="filter__select"
            onChange={handleQuantityChange}
          >
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
