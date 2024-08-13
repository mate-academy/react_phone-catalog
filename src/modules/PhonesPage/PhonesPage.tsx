import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Breadcrumbs } from '../../components/Breadcrumbs';



export const PhonesPage: React.FC = () => {

const category = 'phones';


    return (

      <div>
        <Header />
        <Breadcrumbs category = {category}/>
        <ProductList category = {category} />
      </div>
    );
};

