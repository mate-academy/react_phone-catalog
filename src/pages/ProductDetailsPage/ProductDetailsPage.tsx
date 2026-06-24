import { useParams } from 'react-router-dom';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product Details</h1>
      <p>ID: {productId}</p>
    </div>
  );
};
