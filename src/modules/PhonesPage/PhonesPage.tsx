import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';




export const PhonesPage: React.FC = () => {

const typeOfProduct = 'phones';


    return (

      <div>
        <Header />
        <ProductList typeOfProduct = {typeOfProduct} />
      </div>
    );
};

