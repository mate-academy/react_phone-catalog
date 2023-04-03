import { ProductPage } from '../../components/ProductPage';
import { get } from '../../helpers/api/fetchProducts';

export const TabletsPage: React.FC = () => {
  return (
    <section className="tablets">
      <ProductPage title="Tablets" getProducts={get.tablets} />
    </section>
  );
};
