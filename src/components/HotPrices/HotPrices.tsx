import { useContext } from 'react';
import { ProductBlock } from '../ProductBlock';
import { Slider } from '../Slider';
import { CatalogContext } from '../../context';
import { getSalePrice } from '../../helpers/helpers';

export const HotPrices: React.FC = () => {
  const { products } = useContext(CatalogContext);
  const productsWithDiscount = products
    .filter(product => product.discount > 0)
    .sort((a, b) => {
      const priceA = getSalePrice(a.price, a.discount);
      const priceB = getSalePrice(b.price, b.discount);

      return priceA - priceB;
    });

  return (
    <section className="page__section hot-prices">
      <div className="container">
        <Slider />
        <ProductBlock
          sectionTitle="Hot prices"
          products={productsWithDiscount}
        />
      </div>
    </section>
  );
};
