import { FC } from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetailsPage: FC = () => {
  const { productId } = useParams();

  return (
    <div>
      ProductDetailsPage
      {productId}
    </div>
  );
};
