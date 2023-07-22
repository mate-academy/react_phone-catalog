import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { LinearProgress } from '@mui/material';

import swal from 'sweetalert';
import { getProducts } from '../api/getData';

import { Card } from './Card';

import { Phone } from '../type/Phone';
import { RootState } from '../Reducer/store';
import { NoResult } from './NoResult';

type Props = {
  onGetListLength: (number: number) => void;
  sort: string;
  quantity: number;
  currPage: number;
  query: string;
};

export const Catalog: React.FC<Props> = ({
  onGetListLength,
  sort,
  quantity,
  currPage,
  query,
}) => {
  const [catalog, setCatalog] = useState<Phone[]>([]);
  const { category } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const favorites = useSelector((state: RootState) => state.favorites);

  const [fetchingData, setFetchingData] = useState(true);

  const location = useLocation();

  const data = async () => {
    try {
      setFetchingData(true);

      const result = await getProducts();

      const getCatalog = result
        .filter((element) => element.category === category);

      setCatalog(getCatalog);

      onGetListLength(getCatalog.length);

      setFetchingData(false);
    } catch {
      swal({
        icon: 'error',
        title: 'Empty list, Data Error!',
        text: 'Try again in 5 minutes',
      });
    }
  };

  useEffect(() => {
    if (location.pathname === '/categories/favorites') {
      setFetchingData(true);

      setCatalog(favorites);

      onGetListLength(favorites.length);

      setFetchingData(false);
    } else {
      data();
    }

    if (!searchParams.get('query')) {
      setSearchParams({ query: '' });
    }
  }, [category]);

  let listOfResults = [...catalog].sort((el1, el2) => {
    switch (sort) {
      case 'age':
        return el2.year - el1.year;

      case 'name':
        return el2.name.localeCompare(el1.name);

      case 'price':
        return el1.price - el2.price;

      default:
        return el2.price - el1.price;
    }
  }).slice(currPage * quantity - quantity, currPage * quantity);

  if (query) {
    listOfResults = listOfResults
      .filter((element) => element.name.toLowerCase()
        .includes(query.toLowerCase()));
  }

  if (fetchingData) {
    return (
      <div className="container" style={{ margin: '25px 0px' }}>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="catalog__content" data-cy="productList">
      {listOfResults.length ? listOfResults.map((item: Phone) => (
        <Card card={item} key={item.itemId} />
      )) : (
        <NoResult />
      )}
    </div>
  );
};
