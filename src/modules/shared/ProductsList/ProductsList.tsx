import React from 'react';
// import styles from './ProductsList.module.scss';
import { Product } from './../../../types/Product';
import { GadgetCard } from '../gadgetCard/GadgetCard';

type ProductList = {
  gadgets: Product[] | undefined;
};

export const ProductsList: React.FC<ProductList> = ({ gadgets }) => {
  return (
    <ul>
      {gadgets?.map(gadget => (
        <li key={gadget.id}>
          <GadgetCard gadget={gadget} />
        </li>
      ))}
    </ul>
  );
};
