/* import { useLocation } from 'react-router-dom'; */
import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer'
import { UnderConstruction } from '../../components/UnderConstruction';

export const TabletsPage: React.FC = () => {
  const category = 'tablets';
  const title = 'Tablets'
   return (

      <div>
        <UnderConstruction />
        <Header />
        <ProductList category =  {category} title={title}/>
        <Footer />
      </div>
    );
};
