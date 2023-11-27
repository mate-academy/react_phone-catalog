import { ProductPage } from '../../components/ProductPage';
import { get } from '../../helpers/api/fetchProducts';

export const AccessoriesPage: React.FC = () => {
  return (
    <section className="accessories">
      <ProductPage title="Accessories" getProducts={get.accessories} />
    </section>
  );
};
