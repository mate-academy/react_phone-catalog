import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { UnderConstruction } from '../../components/UnderConstruction';

export const PhonesPage: React.FC = () => {
  const category = 'phones';
  const title = 'Mobile Phones';

  return (
    <div>
      <UnderConstruction />
      <Header />
      <ProductList category={category} title={title} />
      <Footer />
    </div>
  );
};
