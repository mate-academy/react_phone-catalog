import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer'



export const AccessoriesPage: React.FC = () => {

const category = 'accessories';
const title = 'Accessories'

    return (

      <div>
        <Header />
        <ProductList category = {category} title = {title}/>
        <Footer />
      </div>
    );
};

