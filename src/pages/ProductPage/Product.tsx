import { useParams } from 'react-router-dom';

export const Product = () => {
  const { itemId } = useParams();

  return <div>ProductPage {itemId}</div>;
};
