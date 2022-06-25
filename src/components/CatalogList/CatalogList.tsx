import React from 'react';
import { Item } from '../../types';
import ProductCart from '../ProductCart/ProductCart';

type Props = {
  visibleItems: Item[];
};

const CatalogList:React.FC<Props> = React.memo(({ visibleItems }) => {
  return (
    <ul className="catalog__list">
      {visibleItems.map((item: Item) => (
        <ProductCart item={item} key={item.id} />
      ))}
    </ul>
  );
});

export default CatalogList;
