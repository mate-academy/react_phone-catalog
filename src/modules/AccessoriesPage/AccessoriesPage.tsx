import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PreviousPage } from '../../components/PreviousPage';
import { useLocation } from 'react-router-dom';

export const AccessoriesPage: React.FC = () => {
  const category = useLocation().pathname.slice(1)
  const title = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div>
      <PreviousPage category= {category}/>
      <Header />
      <ProductList category={category} title={title} />
      <Footer />
    </div>
  );
};
