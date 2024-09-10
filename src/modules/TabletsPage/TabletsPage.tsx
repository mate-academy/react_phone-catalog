import { ProductList } from '../../components/ProductList';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';

export const TabletsPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div>
      <PreviousPage category={category} />
      <ProductList category={category} title={title} />
    </div>
  );
};
