import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { LinearProgress } from '@mui/material';

import { getProducts } from '../api/getData';

import { Card } from './Card';

import { Phone } from '../type/Phone';
import { RootState } from '../Reducer/store';

type Props = {
  onGetListLength: (number: number) => void;
  category: string;
  sort: string;
  quantity: number;
  currPage: number;
};

export const Catalog: React.FC<Props> = ({
  category,
  onGetListLength,
  sort,
  quantity,
  currPage,
}) => {
  const [catalog, setCatalog] = useState<Phone[]>([]);
  const favorites = useSelector((state: RootState) => state.favorites);

  const [fetchingData, setFetchingData] = useState(true);

  const location = useLocation();

  const data = async () => {
    try {
      setFetchingData(true);

      const result = await getProducts();

      const getCatalog = result.filter(element => (
        element.category === `${category}` && element.capacity.length > 0
      ));

      setCatalog(getCatalog);

      onGetListLength(getCatalog.length);

      setFetchingData(false);
    } catch {
      throw new Error('Hello, Mario, HotPrices comp');
    }
  };

  useEffect(() => {
    if (location.pathname === '/favorites') {
      setFetchingData(true);

      setCatalog(favorites);

      onGetListLength(favorites.length);

      setFetchingData(false);
    } else {
      data();
    }
  }, [location]);

  const listOfResults = [...catalog].sort((el1, el2) => {
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

  if (fetchingData) {
    return (
      <div className="container" style={{ margin: '25px 0px' }}>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="catalog__content" data-cy="productList">
      {listOfResults.map((item: Phone) => (
        <Card card={item} key={item.id} />
      ))}
    </div>
  );
};
