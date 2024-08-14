import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';




export const AccessoriesPage: React.FC = () => {

const category = 'accessories';


    return (

      <div>
        <Header />

        <ProductList category = {category} />
      </div>
    );
};

