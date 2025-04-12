import React, { Suspense } from 'react';
import { useOutletContext } from 'react-router-dom';
const ProductDetails = React.lazy(
  () => import('../components/ProductDetails/ProductDetails'),
);

type ContextType = {
  disabledIds: number[];
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const DetailsPage: React.FC = () => {
  const { disabledIds, setDisabledIds } = useOutletContext<ContextType>();

  return (
    <>
      <Suspense>
        <ProductDetails
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
        />
      </Suspense>
    </>
  );
};
