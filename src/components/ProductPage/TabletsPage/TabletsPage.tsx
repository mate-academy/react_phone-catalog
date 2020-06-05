import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import '../ProductsPage.scss';

type Props = {
  tablets: ProductItem[];
};

export const TabletsPage: React.FC<Props> = ({ tablets }) => {
  const [tabletsList, setTabletsList] = useState<ProductItem[]>([]);
  const [sortedTablets, setSortedTablets] = useState([...tablets]);

  const perPageOption = ['2', '4', '8', '16'];
  const location = useLocation();
  const history = useHistory();


  const searchParams = new URLSearchParams(location.search);

  const quantity = searchParams.get('quantity') || `${tablets.length}`;
  const sortType = searchParams.get('sort') || 'age';

  useEffect(() => {
    setTabletsList(tablets);
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
        setSortedTablets([...tabletsList]
          .sort((a, b) => a[sortType].localeCompare(b[sortType])).slice(0, +quantity));
        break;
      case 'age':
      case 'price':
        setSortedTablets([...tabletsList]
          .sort((a, b) => a[sortType] - b[sortType]).slice(0, +quantity));
        break;
      default: setSortedTablets([...tabletsList]);
    }
  }, [tabletsList, sortType, quantity]);

  return (
    <div className="products__container products container">
      <h1 className="products__title">Tablets</h1>
      <p className="products__quantity">
        {tablets.length}
        {/* {sortedTablets.length} */}
        {' '}
        <span className="products__quantityText">models</span>
      </p>
      <div className="products__filter filter">
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
            <option value={tablets.length}>All</option>
            {perPageOption.map(item => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="products__list">
        {sortedTablets.map(product => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};
