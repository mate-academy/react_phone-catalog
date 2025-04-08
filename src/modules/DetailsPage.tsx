import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';

type ContextType = {
  disabledIds: number[];
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
};

type Props = {
  url: string;
}

export const DetailsPage: React.FC<Props> = () => {
  const { disabledIds, setDisabledIds } = useOutletContext<ContextType>();

  return (
    <>
      <ProductDetails
        disabledIds={disabledIds}
        setDisabledIds={setDisabledIds}
      />
    </>
  );
};
