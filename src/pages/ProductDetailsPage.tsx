import { useParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  console.log(productId);
  return (
    <div>
      <BreadCrumbs />
    </div>
  );
};
