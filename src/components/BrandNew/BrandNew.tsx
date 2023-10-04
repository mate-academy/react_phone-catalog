import { FC } from 'react';
import { getBrandNewProducts } from '../../helpers/getBrandNewProducts';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';

type Props = {
  products: Product[],
};

export const BrandNew: FC<Props> = ({ products }) => {
  const brandNewProducts = getBrandNewProducts(products);

  return (
    <section className="page__section slider">
      <ProductsSlider
        products={brandNewProducts}
        title="Brand new models"
      />
    </section>
  );
};
