import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Breadcrumbs } from '../../components/Breadcrumbs';



export const AccessoriesPage: React.FC = () => {

const category = 'accessories';


    return (

      <div>
        <Header />
        <Breadcrumbs category = {category}/>
        <ProductList category = {category} />
      </div>
    );
};

