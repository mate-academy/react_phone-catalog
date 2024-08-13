import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';




export const PhonesPage: React.FC = () => {

const category = 'phones';


    return (

      <div>
        <Header />
        <ProductList category = {category} />
      </div>
    );
};

