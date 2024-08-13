import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';




export const AccessoriesPage: React.FC = () => {

const typeOfProduct = 'accessories';


    return (

      <div>
        <Header />
        <ProductList typeOfProduct = {typeOfProduct} />
      </div>
    );
};

