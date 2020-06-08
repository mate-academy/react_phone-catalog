import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getProducts } from '../../api';
import SortBy from '../../helpers/SortBy';
import ItemsOnPage from '../../helpers/ItemsOnPage';
import ProductList from '../ProductList/ProductList';
import Pagination from '../../helpers/Pagination';
import Loader from '../loader/Loader';
import ErrorPage from '../../helpers/ErrorPage';
import './ItemsPage.scss';
import FILTER from '../../helpers/FILTERS';
import PAGES from '../../helpers/PAGES';

type Props = RouteComponentProps<{
  itemName: string;
}>;

const ItemsPage: React.FC<Props> = ({ location, match }) => {
  const [itemsFromServer, setItemsFromServer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preparedItem, setPreparedItem] = useState([]);
  const [typeItem, setTypeItem] = useState('');
  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  const sort: string = searchParams.get('sort') || '';
  const page: number = Number(searchParams.get('page')) || 1;
  const perPage: number = Number(searchParams.get('perPage')) || itemsFromServer.length;
  const start: number = (page - 1) * perPage;
  let pageCount = Math.ceil(itemsFromServer.length / perPage) || 1;
  const lowerQuery = query.toLowerCase();

  useEffect(() => {
    switch (match.path) {
      case PAGES.tablets:
        setTypeItem(FILTER.tablet);
        break;
      case PAGES.phones:
        setTypeItem(FILTER.phone);
        break;
      case PAGES.accessories:
        setTypeItem(FILTER.accessories);
        break;
      default:
        setTypeItem(FILTER.phone);
    }
  }, [match, location]);

  const errorDownload = () => {
    return <ErrorPage />;
  };

  useEffect(() => {
    getProducts()
      .then(data => setItemsFromServer(data
        .filter((item: Item) => item.type === typeItem)))
      .catch(() => errorDownload());
    setTimeout(() => setIsLoading(false), 500);
  }, [typeItem]);

  useEffect(() => {
    const result = itemsFromServer
      .filter((item: Item) => item.name
        .toLowerCase()
        .includes(lowerQuery));

    switch (sort) {
      case 'price':
        setPreparedItem(result
          .sort((a: Item, b: Item): number => a.price - b.price));
        break;
      case 'name':
        setPreparedItem(result
          .sort((a: Item, b: Item): number => a.name.localeCompare(b.name)));
        break;
      default:
        setPreparedItem(result
          .sort((a: Item, b: Item): number => a.age - b.age));
    }
  }, [itemsFromServer, query, sort, perPage, lowerQuery]);

  if (itemsFromServer.length === 0 && !isLoading) {
  return <ErrorPage />
  };

  if (query !== '') {
    pageCount = Math.ceil(preparedItem.length / perPage);
  }

  const viviblePreparedItem = preparedItem.slice(start, start + perPage);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="phones-page">
      <section className="nav-location">
        <Link to="/" className="nav-location__svg-home">
          <img src="./img/home.svg" alt="home" />
        </Link>
        <div className="nav-location__svg-arrow">
          <img src="./img/ArrowRightActive.svg" alt="arrow" />
        </div>
        <p className="nav-location__text">
          {
            (typeItem === FILTER.phone && 'Phones')
            || (typeItem === FILTER.tablet && 'Tablets')
            || (typeItem === FILTER.accessories && 'Accesories')
          }
        </p>
      </section>
      <section className="phones-page__article">
        <h2 className="phones-page__article-title">
          {
            (typeItem === FILTER.phone && 'Mobile phones')
            || (typeItem === FILTER.tablet && 'Tablets')
            || (typeItem === FILTER.accessories && 'Accesories')
          }
        </h2>
        <p className="phones-page__article-count">{query === '' ? (`${itemsFromServer.length} models`) : (`Find ${preparedItem.length} models`)}</p>
      </section>
      <section className="phones-page__sortBy">
        <SortBy />
        <ItemsOnPage countPhones={itemsFromServer.length} />
      </section>
      <ProductList preparedPhones={viviblePreparedItem} />
      <Pagination pageCount={pageCount} />
    </div>
  );
};

export default ItemsPage;
