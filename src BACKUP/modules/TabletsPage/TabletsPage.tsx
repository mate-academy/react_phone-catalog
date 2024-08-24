import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';

export const TabletsPage: React.FC = () => {
  const category = useLocation().pathname.slice(1)
  const title = category.charAt(0).toUpperCase() + category.slice(1)
  console.log('PAGE CLICKED',category)

  return (
    <div>
      <PreviousPage category= {category}/>
      <Header />
      <ProductList category={category} title={title} />
      <Footer />
    </div>
  );
};
