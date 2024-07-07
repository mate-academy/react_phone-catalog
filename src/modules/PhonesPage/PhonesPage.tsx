import { useLocation } from 'react-router-dom';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';

export const PhonesPage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[1];

  return <ProductGrid category={category} title="Mobile phones" />;
};
