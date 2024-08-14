/* import { useLocation } from 'react-router-dom'; */
import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';


export const TabletsPage: React.FC = () => {
  const category = 'tablets';
   return (

      <div>
        <Header />

        <ProductList category =  {category} />
      </div>
    );
};
