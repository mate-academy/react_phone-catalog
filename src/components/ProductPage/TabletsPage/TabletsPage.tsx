import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import '../ProductsPage.scss';
import { Pagination } from '../Pagitation';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';

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

  const quantity = Number(searchParams.get('quantity') || `${tablets.length}`);
  const sortType = searchParams.get('sort') || 'age';

  const page = Number(searchParams.get('page')) || 1;
  const start = (page - 1) * quantity;
  let pageCount = Math.ceil(tablets.length / quantity) || 1;

  const query = searchParams.get('query') || '';
  const lowerQuery = query.toLowerCase();

  useEffect(() => {
    setTabletsList(tablets);
  }, [tablets]);

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
    const pattern = new RegExp(query, 'i');
    const result = tabletsList
      .filter(item => pattern.test(item.name));

    switch (sortType) {
      case 'name':
        setSortedTablets(result
          .sort((a, b) => a[sortType].localeCompare(b[sortType])));
        break;
      case 'age':
      case 'price':
        setSortedTablets(result
          .sort((a, b) => a[sortType] - b[sortType]));
        break;
      default: setSortedTablets([...tabletsList]);
    }
  }, [tabletsList, sortType, quantity, query, lowerQuery, pageCount]);

  if (query !== '') {
    pageCount = Math.ceil(sortedTablets.length / quantity);
  }

  const visibleItemsOnPage = sortedTablets.slice(start, start + quantity);

  return (
    <div className="products__container products container">
      <BreadCrumbs />
      <h1 className="products__title">Tablets</h1>
      <p className="products__quantity">
        {tablets.length}
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
        {visibleItemsOnPage.map(product => (
          <ProductCard product={product} />
        ))}
      </div>
      <Pagination pageCount={pageCount} />
    </div>
  );
};
