// eslint-disable-next-line max-len
import { BarNavigation } from '../PhonesPage/components/BarNavigation/BarNavigation';
import { ProductList } from '../../shared/ProductList/ProductList';

export const TablesPage = () => {
  return (
    <div className="phones-page__content">
      <BarNavigation nameCategory="Tablets" />
      <h1 className="text-h1 phones-page__title">Tablets</h1>
      <p className="text-body secondary phones-page__number-phones">
        36 models
      </p>

      <div className="product-list">
        <ProductList category="tablets" />
      </div>
    </div>
  );
};

export default TablesPage;
