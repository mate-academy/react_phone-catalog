import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { getProducts } from '../../api/getData';
import { Card } from '../Card/Card';

import './catalog.scss';
import { Phone } from '../../type/Phone';

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

  const [fetchingData, setFetchingData] = useState(true);

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
    data();
  }, []);

  const listOfResults = catalog.sort((el1, el2) => {
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

  return (
    <div className="catalog__content" data-cy="productList">
      {fetchingData
        ? (
          <div className="catalog__loading">
            <LinearProgress color="secondary" />
          </div>
        )
        : listOfResults.map((item: Phone) => (
          <Card card={item} key={item.id} />
        ))}
    </div>
  );
};
