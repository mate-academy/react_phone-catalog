import { ProductList } from '../../components/ProductList';
import { PreviousPage } from '../../components/PreviousPage';
import { useLocation } from 'react-router-dom';

export const AccessoriesPage: React.FC = () => {
  const category = useLocation().pathname.slice(1)
  const title = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div>
      <PreviousPage category= {category}/>
      <ProductList category={category} title={title} />
    </div>
  );
};
