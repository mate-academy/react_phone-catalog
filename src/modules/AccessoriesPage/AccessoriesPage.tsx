// eslint-disable-next-line max-len
import { BarNavigation } from '../PhonesPage/components/BarNavigation/BarNavigation';
import { ProductList } from '../../shared/ProductList/ProductList';

export const AccessoriesPage = () => {
  return (
    <div className="phones-page__content">
      <BarNavigation nameCategory="Accessories" />
      <h1 className="text-h1 phones-page__title">Accessories</h1>
      <p className="text-body secondary phones-page__number-phones">
        34 models
      </p>

      <div className="product-list">
        <ProductList category="accessories" />
      </div>
    </div>
  );
};
