import { ProductPage } from '../../components/ProductPage/ProductPage';
import { get } from '../../helpers/api/fetchProducts';

export const PhonesPage: React.FC = () => {
  return (
    <section className="phones">
      <ProductPage title="Mobile Phones" getProducts={get.phones} />
    </section>
  );
};
