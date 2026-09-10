import './PhonesPage.scss';
import BarNavigation from './components/BarNavigation/BarNavigation';
import { ProductList } from '../../shared/ProductList/ProductList';

export const HomePage = () => {
  return (
    <div className="phones-page__content">
      <BarNavigation nameCategory="Phones" />
      <h1 className="text-h1 phones-page__title">Mobile phones</h1>
      <p className="text-body secondary phones-page__number-phones">
        95 models
      </p>

      <div className="product-list">
        <ProductList category="phones" />
      </div>
    </div>
  );
};

export default HomePage;
