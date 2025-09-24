import React, { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../ProductsProvider';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { phones, tablets, accessories } = useContext(ProductsContext);
  const gadget = useMemo(
    () =>
      phones.find(p => p.id === productId) ||
      tablets.find(p => p.id === productId) ||
      accessories.find(p => p.id === productId),
    [phones, tablets, accessories, productId],
  );

  if (!gadget) {
    return <h2>Product was not found</h2>;
  }

  return (
    <div>
      <h1>{gadget.name}</h1>
    </div>
  );
};
