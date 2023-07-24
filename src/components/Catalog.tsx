import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { LinearProgress } from '@mui/material';

import swal from 'sweetalert';
import { getProducts } from '../api/getData';

import { Card } from './Card';

import { Products } from '../type/Products';
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
  const [catalog, setCatalog] = useState<Products[]>([]);
  const { category } = useParams();

  const favorites = useSelector((state: RootState) => state.favorites);

  const [fetchingData, setFetchingData] = useState(true);

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
    if (category === 'favorites') {
      setFetchingData(true);

      setCatalog(favorites);

      onGetListLength(favorites.length);

      setFetchingData(false);
    } else {
      data();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  let listOfResults: Products[] = [];

  const processQuery = (str: string) => {
    const processedQuery = str ? str.toLowerCase().split(' ') : [];

    const filteredResults = catalog.filter((element) => processedQuery
      .every(word => element.name.toLowerCase().includes(word)));

    onGetListLength(filteredResults.length);

    return filteredResults;
  };

  listOfResults = processQuery(query);

  listOfResults = [...listOfResults].sort((el1, el2) => {
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
  });

  listOfResults = listOfResults
    .slice(currPage * quantity - quantity, currPage * quantity);

  if (fetchingData) {
    return (
      <div className="container" style={{ margin: '25px 0px' }}>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="catalog__content" data-cy="productList">
      {listOfResults.length ? listOfResults.map((item: Products) => (
        <Card card={item} key={item.itemId} />
      )) : (
        <NoResult />
      )}
    </div>
  );
};
