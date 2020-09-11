import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import GadgetCard from '../homePage/GadgetCard/GadgetCard';
import './ProductsList.scss';

type Props = {
  gadgets: Gadget[];
};

const ProductsList: React.FC<Props> = ({ gadgets }) => {
  return (
    <div className="products-list">
      {gadgets.map(gadget => (
        <GadgetCard
          gadget={gadget}
          key={uuidv4()}
        />
      ))}
    </div>
  );
};

export default ProductsList;
