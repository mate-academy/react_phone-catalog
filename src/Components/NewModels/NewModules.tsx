import { getNewPhones } from '../../utils/productsHelper';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import productsFromServer from '../../../public/api/products.json';
import './NewModules.scss';

export const NewModules = () => {
  return (
    <div className="new-modules">
      <div className="new-modules__container">
        <h2 className="new-modules__title">Brand new models</h2>
        <ProductsSlider
          products={getNewPhones(productsFromServer)}
          fullPrice={false}
        />
      </div>
    </div>
  );
};
