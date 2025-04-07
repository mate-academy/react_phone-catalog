import React from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { Phone } from '../types/Phone';

type ContextType = {
  disabledIds: number[];
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
  category: Phone[];
};

export const DetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { disabledIds, setDisabledIds, category } = useOutletContext<ContextType>();

  return (
    <>
      <ProductDetails
        productId={productId}
        disabledIds={disabledIds}
        setDisabledIds={setDisabledIds}
        category={category}
      />
    </>
  );
};
