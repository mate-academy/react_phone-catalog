import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ProductDetails } from '../utils/lazyComponents';

type ContextType = {
  disabledIds: number[];
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const DetailsPage: React.FC = () => {
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

export default DetailsPage;
