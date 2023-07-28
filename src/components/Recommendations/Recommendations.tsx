import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';
import { getSuggestedProducts } from '../../helpers/getSuggestedProducts';

type Props = {
  products: Product[],
};

export const Recommendations: FC<Props> = ({ products }) => {
  const recommendations = getSuggestedProducts(products);

  return (
    <section className="page__section slider">
      <ProductsSlider
        products={recommendations}
        title="You may also like"
      />
    </section>
  );
};
