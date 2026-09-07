import { getHotPrices } from '../../utils/productsHelper';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import productsFromServer from '../../../public/api/products.json';
import './HotPrices.scss';

export const HotPrices = () => {
  return (
    <div className="hot-prices">
      <div className="hot-prices__container">
        <h2 className="hot-prices__title">Hot Prices</h2>
        <ProductsSlider
          products={getHotPrices(productsFromServer)}
          fullPrice={true}
        />
      </div>
    </div>
  );
};
