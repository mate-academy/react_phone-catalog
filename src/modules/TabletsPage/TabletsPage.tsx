import './TabletsPage.module.scss';
import { useLocation } from 'react-router-dom';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';

export const TabletsPage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[1];

  return <ProductGrid category={category} title="Tablets" />;
};
