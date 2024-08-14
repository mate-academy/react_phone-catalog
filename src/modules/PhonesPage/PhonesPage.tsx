import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer'



export const PhonesPage: React.FC = () => {

const category = 'phones';


    return (

      <div>
        <Header />

        <ProductList category = {category} />
        <Footer />
      </div>
    );
};

