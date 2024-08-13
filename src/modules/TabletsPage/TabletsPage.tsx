/* import { useLocation } from 'react-router-dom'; */
import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const TabletsPage: React.FC = () => {
  const category = 'tablets';
   return (

      <div>
        <Header />
        <Breadcrumbs category = {category}/>
        <ProductList category =  {category} />
      </div>
    );
};
