import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer'
import { UnderConstruction } from '../../components/UnderConstruction';


export const AccessoriesPage: React.FC = () => {

const category = 'accessories';
const title = 'Accessories'

    return (

      <div>
        <UnderConstruction />
        <Header />
        <ProductList category = {category} title = {title}/>
        <Footer />
      </div>
    );
};

