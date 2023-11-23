import { Card } from './Card';

import { Products } from '../type/Products';
import { NoResult } from './NoResult';

type Props = {
  catalog: Products[],
  sort: string;
  quantity: number;
  currPage: number;
  query: string;
};

export const Catalog: React.FC<Props> = ({
  catalog,
  sort,
  quantity,
  currPage,
  query,
}) => {
  let listOfResults: Products[] = [];

  const processQuery = (str: string) => {
    const processedQuery = str ? str.toLowerCase().split(' ') : [];

    const filteredResults = catalog.filter((element) => processedQuery
      .every(word => element.name.toLowerCase().includes(word)));

    return filteredResults;
  };

  listOfResults = processQuery(query);

  listOfResults = [...listOfResults].sort((el1, el2) => {
    switch (sort) {
      case 'Age':
        return el2.year - el1.year;

      case 'Name':
        return el2.name.localeCompare(el1.name);

      case 'Price':
      default:
        return el2.price - el1.price;
    }
  });

  listOfResults = listOfResults
    .slice(currPage * quantity - quantity, currPage * quantity);

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
