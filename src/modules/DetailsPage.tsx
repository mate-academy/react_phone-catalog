import React from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';

type ContextType = {
  disabledIds: number[];
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const DetailsPage: React.FC = () => {
  const { phoneId } = useParams();
  const { disabledIds, setDisabledIds } = useOutletContext<ContextType>();

  return (
    <>
      <ProductDetails
        productId={phoneId}
        disabledIds={disabledIds}
        setDisabledIds={setDisabledIds}
      />
    </>
  );
};
