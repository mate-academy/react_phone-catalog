import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';




export const AccessoriesPage: React.FC = () => {

const category = 'accessories';
const title = 'Accessories'

    return (

      <div>
        <Header />

        <ProductList category = {category} title = {title}/>
      </div>
    );
};

