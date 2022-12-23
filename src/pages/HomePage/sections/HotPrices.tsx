import { FC } from 'react';
import { HotPriceCard } from 'components/HotPriceCard';
import { Product } from 'types/Product';
import { CustomSlider } from 'components/CustomSlider';

type Props = {
  hotPriceProducts: Product[];
};

export const HotPricesSlider: FC<Props> = ({ hotPriceProducts }) => {
  return (
    <div className="hot-prices phones-section">
      <div className="hot-prices__title">
        <h1>Hot Prices</h1>
      </div>

      <div data-cy="cardsContainer" className="hot-prices__catalog">
        <CustomSlider>
          {hotPriceProducts.map((hotProduct) => {
            return <HotPriceCard key={hotProduct.id} hotProduct={hotProduct} />;
          })}
        </CustomSlider>
      </div>
    </div>
  );
};
