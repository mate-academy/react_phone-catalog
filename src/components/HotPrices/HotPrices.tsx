import { FC } from 'react';
import { getHotPriceProducts } from '../../helpers/getHotPriceProducts';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';

type Props = {
  products: Product[],
};

export const HotPrices: FC<Props> = ({ products }) => {
  const hotPriceProducts = getHotPriceProducts(products);

  return (
    <section className="page__section slider">
      <ProductsSlider
        products={hotPriceProducts}
        title="Hot prices"
      />
    </section>
  );
};
