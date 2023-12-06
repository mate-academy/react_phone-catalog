/* eslint-disable no-console */
import { useParams } from 'react-router-dom';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  console.log(productId);

  return (
    <>
      <h1>
        Products details page id =
        {' '}
        {productId}
      </h1>
    </>
  );
};
